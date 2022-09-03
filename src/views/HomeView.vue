<script setup lang="ts">
import SchemaForm from '@/components/form/index.vue';
import type { IColumn } from '@/components/form/index.vue'
const columns: IColumn[] = [
  {
    label: '标题',
    dataIndex: 'title',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    fieldProps:{
      placeholder: 'haha',
      type: 'textarea',
      // disabled: true,
      showPassword:true,
    }

  },
  {
    name:['title'],
    valueType:'dependency',
    column: ([title]) => {
      return title === 'a' ? [{
        label: title,
        valueType: 'text',
        dataIndex: 'dep'
      },{
        label: 'ttt',
        valueType: 'text',
        dataIndex: 'haha'
      }] : [{
        label: 'zzz',
        valueType: 'datetime',
        dataIndex: 'time'
      }]
    }
  },
  {
    label: '状态',
    dataIndex: 'state',
    valueType: 'number',
  },
  {
    label: '哈哈',
    valueType: 'text',
    dataIndex: 'heihei',
    dependencies:['title'],
    formItemProps: (form:any) => {
      return !form.title ? {
        rules:[
          {
            required:false
          }
        ]
      }:{
        rules:[
        {
          required: true,
          message: '此项为必填项',
        },
        ]
      }
    },
  }
];
</script>

<template>
  <main>
    <SchemaForm :columns="columns"></SchemaForm>
  </main>
</template>
