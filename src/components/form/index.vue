<template>
  <el-form ref="proFormRef" :model="form" :label-position="props.labelPosition">
    <el-form-item
      v-for="{
        dataIndex,
        formItemProps = {},
        valueType,
        ...restColumn
      } in columns"
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
    <el-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' }
      ]"
    >
      <el-input v-model.number="age" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(proFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { IFormItemProps, FieldType } from './interface'
import ProField from './ProField.vue';
import type { FormInstance } from 'element-plus'
export interface IColumn {
  label: string
  dataIndex: string
  valueType: FieldType
  formItemProps?: IFormItemProps
}

import { watch, onBeforeMount, reactive, ref } from 'vue'
const props = defineProps<{
  columns: IColumn[]
  [propsName: string]: any
}>()

const generateColumns = () => {
  const cache: {
    [propsName: string]: any
  } = {}
  props.columns.forEach((col) => {
    const { dataIndex, valueType } = col
    cache[dataIndex] = ''
  })
  return cache
}

const form = reactive(generateColumns())
const proFormRef = ref<FormInstance>()
const age = ref('')
const test = ref('')

const handleValueChange = (key:string,value:any) => {
  form[key] = value;
}

const submitForm = async (formEl: FormInstance | undefined) => {
  debugger
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(form, () => {
  console.log(form, '-----formVal')
})
</script>
