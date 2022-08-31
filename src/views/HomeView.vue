<script setup lang="ts">
import SchemaForm from '@/components/form/index.vue';
import type { IColumn } from '@/components/form/index.vue'
const columns: IColumn[] = [
  {
    label: '标题',
    dataIndex: 'title',
    valueType: 'text',
    formItemProps: {
      placeholder: 'haha',
      type: 'textarea',
      // disabled: true,
      showPassword:true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    label: '状态',
    dataIndex: 'state',
    valueType: 'number',
  },
];
</script>

<template>
  <main>
    <SchemaForm :columns="columns"></SchemaForm>
  </main>
</template>
