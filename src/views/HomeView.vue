<script setup lang="ts">
import SchemaForm from '@/components/form/index.vue';
import type { IColumn } from '@/components/form/index.vue';
const promise = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve([{
        label: 'aaa',
        value: 'aaa'
      },{
        label: 'bbb',
        value: 'bbb'
      }])
    },1000)
  })
}
const test = async (form) => {
  const haha = await promise()
  return haha;
}
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
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
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
