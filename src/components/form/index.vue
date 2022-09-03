<template>
  <el-form ref="proFormRef" :model="form" :label-position="props.labelPosition">
    <el-form-item
      v-for="{
        dataIndex,
        fieldProps = {},
        valueType,
        formItemProps = {},
        ...restColumns
      } in stateCol"
      v-bind:key="dataIndex"
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
    <el-form-item>
      <el-button type="primary" @click="submitForm(proFormRef)"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { IFormItemProps, FieldType } from './interface';
import ProField from './ProField.vue';
import type { FormInstance } from 'element-plus';
export interface IColumn {
  label?: string;
  dataIndex?: string;
  valueType?: FieldType;
  name?: string[];
  column?: (val: any) => IColumn[];
  formItemProps?: IFormItemProps;
  fieldProps?: {
    [propsName:string] :any
  }
}

import { watch, onBeforeMount, reactive, ref, computed, onMounted } from 'vue';
const props = defineProps<{
  columns: IColumn[];
  [propsName: string]: any;
}>();

let depMap = ref(new Map());

const generateColumns = () => {
  const cacheForm: {
    [propsName: string]: any;
  } = {};
  const cacheDepMap = new Map();
  props.columns.forEach((col,colIndex) => {
    const { dataIndex, valueType, column, name } = col;
    if (valueType === 'dependency') {
      if (Array.isArray(name)) {
        name.forEach((n) => {
          const curDep = cacheDepMap.get(n) || [];
          cacheDepMap.set(n, [...curDep, {depParentSort:colIndex,column}]);
        });
      }
    } else if (dataIndex) {
      cacheForm[dataIndex] = '';
    }
  });
  return {
    cacheForm,
    cacheDepMap,
  };
};

let form = reactive<{
  [propsName:string]:any
}>({});
const proFormRef = ref<FormInstance>();
const stateCol = ref<any[]>([]);

const updateColumns = (sort:number,columns:any[]) => {
  // 看动态生成的column是否已经添加过
  let hasAddInColumns = false
  let addColumnsNum = 0
  for(let i = 0; i < stateCol.value.length; i ++){
    const { sort:curSort } = stateCol.value[i]
    if(sort === curSort){
      hasAddInColumns = true
      addColumnsNum += 1
    }
  }
  if(!hasAddInColumns && columns.length){
    stateCol.value.splice(sort,0,...columns)
  }else if(hasAddInColumns && !columns.length){
    stateCol.value.splice(sort,addColumnsNum)
  }else if(hasAddInColumns && columns.length){
    stateCol.value.splice(sort,addColumnsNum,...columns)
  }

}

const handleValueChange = (key: string, value: any) => {
  form[key] = value;
  const curDepCol = depMap.value.get(key)
  if (curDepCol) {
    for (let i = 0; i < curDepCol.length; i++) {
      const { depParentSort,column } = curDepCol[i]
      const addDepCol = column([form[key]]).map(c => {
        return {
          ...c,
          sort:depParentSort,
        }
      })
      updateColumns(depParentSort,addDepCol)
    }
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

onBeforeMount(() => {
  const { cacheDepMap, cacheForm } = generateColumns();
  depMap = ref(cacheDepMap);
  form = reactive(cacheForm);
  props.columns.forEach((col, index) => {
    const { dataIndex, valueType, column, name } = col;
    if (dataIndex) {
      stateCol.value.push({
        ...col,
        sort: index,
      });
    } else {
      const initVal = Array.isArray(name)
        ? name.map((n) => cacheForm[n])
        : cacheForm[name];
      const depCols = column ? column(initVal) : [];
      for (let i = 0; i < depCols.length; i++) {
        const { dataIndex,valueType } = depCols[i]
        stateCol.value.push({
          ...depCols[i],
          sort:index
        });
        form[dataIndex] = valueType === 'switch' ? false : true
      }
    }
  });
  console.log(stateCol,'-----stateCol')
});
</script>
