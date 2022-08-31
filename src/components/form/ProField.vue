<template>
  <el-input
    v-if="props.type === 'text'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-input>
  <el-input-number
    v-else-if="props.type === 'number'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-input-number>
  <el-select
    v-else-if="props.type === 'select'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-select>
  <el-radio-group
    v-else-if="props.type === 'radio'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-radio-group>
  <el-checkbox-group
    v-else-if="props.type === 'checkbox'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-checkbox-group>
  <el-cascader
    v-else-if="props.type === 'cascader'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-cascader>
  <el-switch
    v-else-if="props.type === 'switch'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-switch>
  <el-slider
    v-else-if="props.type === 'slider'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-slider>
  <el-time-select
    v-else-if="props.type === 'time'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-time-select>
  <el-date-picker
    v-else-if="props.type === 'date' || 'datetime'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-date-picker>
  <el-upload
    v-else-if="props.type === 'upload'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-upload>
  <el-rate
    v-else-if="props.type === 'rate'"
    v-model="fieldValue"
    v-bind="props.formItemProps || {}"
  ></el-rate>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FieldType } from './interface'
const props = defineProps<{
  type: FieldType
  dataIndex: string
  formItemProps:
    | {
        [propsName: string]: any
      }
    | undefined
}>()
const emits = defineEmits(['valueChange'])

const fieldValue = ref(undefined);

watch(
  () => fieldValue.value,
  () => {
  emits('valueChange',props.dataIndex,fieldValue)
})
</script>
