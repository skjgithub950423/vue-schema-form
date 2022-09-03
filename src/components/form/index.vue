<template>
  <el-form ref="proFormRef" :model="form" :label-position="props.labelPosition">
    <template
      v-for="{
        dataIndex,
        fieldProps = {},
        valueType,
        formItemProps = {},
        dependencies,
        ...restColumns
      } in stateCol"
      v-bind:key="dataIndex"
    >
      <el-form-item
        v-if="dependencies"
        :prop="dataIndex"
        v-bind="{
          ...depPropsStore.get(dataIndex).formItemProps,
          ...restColumns
        }"
      >
        <pro-field
          :dataIndex="dataIndex"
          :type="valueType"
          :fieldProps="depPropsStore.get(dataIndex).fieldProps"
          @value-change="handleValueChange"
        ></pro-field>
      </el-form-item>
      <el-form-item
        v-else
        :prop="dataIndex"
        v-bind="{
          ...formItemProps,
          ...restColumns
        }"
      >
        <pro-field
          :dataIndex="dataIndex"
          :type="valueType"
          :fieldProps="fieldProps"
          @value-change="handleValueChange"
        ></pro-field>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="submitForm(proFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { IFormItemProps, FieldType } from './interface'
import ProField from './ProField.vue'
import type { FormInstance } from 'element-plus'
import { watch, onBeforeMount, reactive, ref, computed, onMounted } from 'vue'
import { isFunction } from './utils'

export interface IColumn {
  label?: string
  dataIndex?: string
  valueType?: FieldType
  name?: string[]
  column?: (val: any) => IColumn[]
  formItemProps?: any // todo：完善类型
  fieldProps?: any // todo：完善类型
  dependencies?: string[]
}

const props = defineProps<{
  columns: IColumn[]
  [propsName: string]: any
}>()
let depColumnMap = ref(new Map()) // 存储联动表单column函数
let depPropsMap = ref(new Map()) // 存储联动表单formItemProps和fieldProps函数
const depPropsStore = ref(new Map())
let form = reactive<{
  [propsName: string]: any
}>({})
const proFormRef = ref<FormInstance>()
const stateCol = ref<any[]>([])

const generateColumns = () => {
  const cacheForm: {
    [propsName: string]: any
  } = {}
  const cacheColumnMap = new Map()
  const cachePropsMap = new Map()
  props.columns.forEach((col, colIndex) => {
    const { dataIndex, valueType, column, name, dependencies, formItemProps, fieldProps } = col
    if (valueType === 'dependency') {
      // 动态生成column，遍历name存入cacheColumnMap，表单值改变时用于触发column
      if (Array.isArray(name)) {
        name.forEach((n) => {
          const curDep = cacheColumnMap.get(n) || []
          cacheColumnMap.set(n, [...curDep, { depParentSort: colIndex, column }])
        })
      }
    } else if (dataIndex) {
      cacheForm[dataIndex] = ''
      if (dependencies) {
        // 动态生成formItemProps或fieldProps，作用同上
        dependencies.forEach((item) => {
          const curDep = cachePropsMap.get(item) || []
          const cacheMapItem:{
            dataIndex: string
            formItemProps?: any
            fieldProps?:any
          } = {
            dataIndex,
          }
          if(isFunction(formItemProps)){
            cacheMapItem.formItemProps = formItemProps
          }
          if(isFunction(fieldProps)){
            cacheMapItem.fieldProps = fieldProps
          }
          cachePropsMap.set(item, [...curDep, cacheMapItem])
        })
      }
    }
  })
  return {
    cacheForm,
    cacheColumnMap,
    cachePropsMap
  }
}

// 更新stateCol出发表单重新渲染
const updateColumns = (sort: number, columns: any[]) => {
  // 看动态生成的column是否已经添加过
  let hasAddInColumns = false
  let addColumnsNum = 0
  for (let i = 0; i < stateCol.value.length; i++) {
    const { sort: curSort } = stateCol.value[i]
    if (sort === curSort) {
      hasAddInColumns = true
      addColumnsNum += 1
    }
  }
  if (!hasAddInColumns && columns.length) {
    // 没有添加过且有新column生成，直接添加
    stateCol.value.splice(sort, 0, ...columns)
  } else if (hasAddInColumns && !columns.length) {
    // 已经添加过且没有新column生成，则把已添加的删除
    stateCol.value.splice(sort, addColumnsNum)
  } else if (hasAddInColumns && columns.length) {
    // 已经添加过且有新column生成，先删除后添加
    stateCol.value.splice(sort, addColumnsNum, ...columns)
  }
}

// 更新props
const updateProps = (key:string,newProps:any) => {
  depPropsStore.value.set(key,newProps)
}

// form表单值改变处理函数
const handleValueChange = (key: string, value: any) => {
  form[key] = value
  const curDepCol = depColumnMap.value.get(key)
  const curDepProps = depPropsMap.value.get(key)
  if (curDepCol) {
    for (let i = 0; i < curDepCol.length; i++) {
      const { depParentSort, column } = curDepCol[i]
      const addDepCol = column([form[key]]).map((c) => {
        return {
          ...c,
          sort: depParentSort
        }
      })
      updateColumns(depParentSort, addDepCol)
    }
  }
  if (curDepProps) {
    for (let i = 0; i < curDepProps.length; i++) {
      const { dataIndex, formItemProps, fieldProps } = curDepProps[i]
      const cacheProps:{
        fieldProps?:any
        formItemProps?:any
      } = {}
      if(formItemProps){
        cacheProps.formItemProps = formItemProps(form)
      }
      if(fieldProps){
        cacheProps.fieldProps = fieldProps(form)
      }
      updateProps(dataIndex,cacheProps)
    }
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

onBeforeMount(() => {
  const { cacheColumnMap, cachePropsMap, cacheForm } = generateColumns()
  depColumnMap = ref(cacheColumnMap)
  depPropsMap = ref(cachePropsMap)
  form = reactive(cacheForm)
  props.columns.forEach((col, index) => {
    const { dataIndex, column, name, dependencies, formItemProps, fieldProps, ...restCol } = col
    if (dataIndex) {
      const cacheCol: IColumn = {
        dataIndex,
        name,
        ...restCol
      }
      if (dependencies) {
        // 动态生成formItemProps或者fieldProps,先执行获得初始值
        const cachePropsObj:{
          formItemProps?:any
          fieldProps?:any
        } = {}
        if (formItemProps) {
          cachePropsObj.formItemProps = isFunction(formItemProps) ? formItemProps(cacheForm) : {}
        }
        if (fieldProps) {
          cachePropsObj.fieldProps = isFunction(fieldProps) ? fieldProps(cacheForm) : {}
        }
        depPropsStore.value.set(dataIndex,cachePropsObj)
        // 动态生成的formItemProps和fieldProps从depPropsStore取，因此不用放入stateCol里面
        stateCol.value.push({
          sort: index,
          dependencies,
          ...cacheCol,
        })
      } else {
        // 普通column，直接塞进去
        stateCol.value.push({
          formItemProps : formItemProps || {},
          fieldProps: fieldProps || {},
          sort: index,
          ...cacheCol,
        })
      }
    } else {
      // 动态生成column，先执行一下获得初始值
      const initVal = Array.isArray(name) ? name.map((n) => cacheForm[n]) : cacheForm[name]
      const depCols = column ? column(initVal) : []
      for (let i = 0; i < depCols.length; i++) {
        const { dataIndex, valueType } = depCols[i]
        stateCol.value.push({
          ...depCols[i],
          sort: index
        })
        form[dataIndex] = valueType === 'switch' ? false : true
      }
    }
  })
  console.log(depPropsStore.value.get('heihei').formItemProps,'-------depPropsStore')
  console.log(stateCol, '-----stateCol')
})
</script>
