<template>
  <el-select :value="modelValue" @change="handleValueChange" :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, ref, watch } from 'vue';
export interface IOption {
  label: string;
  value: any;
  [propsName: string]: any;
}
const props = defineProps<{
  modelValue: any;
  dependencies?: string[];
  request?: (value: any) => IOption[];
  [propsName: string]: any;
}>();
const emits = defineEmits(['update:modelValue']);
let options = ref([]);
const loading = ref(false);
const form = inject('form')

const handleValueChange = (val: any) => {
  emits('update:modelValue', val);
};

const loadData = async () => {
    loading.value = true
    try{
        const newOptions: IOption[] = await props.request(form);
        const curOptionLen = options.value.length;
        options.value.splice(0, curOptionLen, ...newOptions);
        loading.value = false
    }catch(err){
        loading.value = false
    }
}

onBeforeMount(async () => {
  if (props.options) {
    options = ref(props.options);
  } else if (props.request) {
    loadData()
  }
});

watch(
  () => {
    let cache = '';
    props.dependencies?.forEach((dep) => {
      cache = cache + form[dep];
    });
    return cache;
  },
  () => {
      loadData()
  },
);
</script>
