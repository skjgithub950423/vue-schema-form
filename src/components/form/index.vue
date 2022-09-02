<template>
  <el-form ref="proFormRef" :model="form" :label-position="props.labelPosition">
    <el-form-item
      v-for="{
        dataIndex,
        formItemProps = {},
        valueType,
        ...restColumn
      } in stateCol"
      v-bind:key="dataIndex"
      :prop="dataIndex"
      :rules="formItemProps.rules || []"
      v-bind="restColumn"
    >
      <pro-field
        :dataIndex="dataIndex"
        :type="valueType"
        :formItemProps="formItemProps"
        @value-change="handleValueChange"
      ></pro-field>
      <!-- <el-input
        v-if="valueType === 'text'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-input>
      <el-input-number
        v-else-if="valueType === 'number'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-input-number>
      <el-select
        v-else-if="valueType === 'select'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-select>
      <el-radio-group
        v-else-if="valueType === 'radio'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-radio-group>
      <el-checkbox-group
        v-else-if="valueType === 'checkbox'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-checkbox-group>
      <el-cascader
        v-else-if="valueType === 'cascader'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-cascader>
      <el-switch
        v-else-if="valueType === 'switch'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-switch>
      <el-slider
        v-else-if="valueType === 'slider'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-slider>
      <el-time-select
        v-else-if="valueType === 'time'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-time-select>
      <el-date-picker
        v-else-if="valueType === 'date' || 'datetime'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-date-picker>
      <el-upload
        v-else-if="valueType === 'upload'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-upload>
      <el-rate
        v-else-if="valueType === 'rate'"
        v-model="form[dataIndex]"
        v-bind="formItemProps || {}"
      ></el-rate> -->
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

const updateColumns = (sort,columns) => {
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

watch(form, () => {
  console.log(form, '-----formVal');
});
</script>
