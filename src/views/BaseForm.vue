<template>
  <SchemaForm 
    :columns="columns" 
    :label-width="100"
    @on-submit="handleFormSubmit"
></SchemaForm>
</template>

<script setup lang="ts">
import SchemaForm from '@/components/form/index.vue'
const columns = [
  {
    label: '姓名',
    dataIndex: 'name',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '姓名必填'
        }
      ]
    }
  },
  {
    label: '年龄',
    dataIndex: 'age',
    valueType: 'number',
    fieldProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    label: '出生日期',
    dataIndex: 'birth',
    valueType: 'date'
  },
  {
    label: '兴趣爱好',
    dataIndex: 'aihao',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: '足球',
          value: 'football'
        },
        {
          label: '篮球',
          value: 'basketball'
        }
      ]
    }
  }
]

const handleFormSubmit = (form:any) => {
    console.log(form)
}
</script>
