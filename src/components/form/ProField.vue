<template>
  <el-input
    v-if="props.type === 'text'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-input>
  <el-input-number
    v-else-if="props.type === 'number'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-input-number>
  <pro-select
    v-else-if="props.type === 'select'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
    :dependencies="props.dependencies"
  >
  </pro-select>
  <el-radio-group
    v-else-if="props.type === 'radio'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-radio-group>
  <el-checkbox-group
    v-else-if="props.type === 'checkbox'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-checkbox-group>
  <el-cascader
    v-else-if="props.type === 'cascader'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-cascader>
  <el-switch
    v-else-if="props.type === 'switch'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-switch>
  <el-slider
    v-else-if="props.type === 'slider'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-slider>
  <el-time-select
    v-else-if="props.type === 'time'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-time-select>
  <el-date-picker
    v-else-if="props.type === 'date' || 'datetime'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-date-picker>
  <el-upload
    v-else-if="props.type === 'upload'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-upload>
  <el-rate
    v-else-if="props.type === 'rate'"
    v-model="fieldValue"
    v-bind="props.fieldProps || {}"
  ></el-rate>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { FieldType } from './interface'
import ProSelect from './ProSelect.vue';
const props = defineProps<{
  type: FieldType
  dataIndex: string
  fieldProps:
    | {
        [propsName: string]: any
      }
    | undefined,
  modelValue: any
  dependencies?: string[]
}>()
const emits = defineEmits(['valueChange','update:modelValue'])

// const fieldValue = ref(undefined);

const fieldValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

watch(
  () => fieldValue.value,
  () => {
  emits('valueChange',props.dataIndex,fieldValue.value)
})
</script>
