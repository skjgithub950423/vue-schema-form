<template>
  <VueSchemaForm :columns="columns" :label-width="100" @on-submit="handleFormSubmit"></VueSchemaForm>
</template>

<script setup lang="ts">
import { VueSchemaForm } from '@sugar950423/vue-schema-form'
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
    label: '性别',
    dataIndex: 'sex',
    valueType: 'radio',
    fieldProps: {
      radioGroup: [
        {
          label: 1,
          title: '男'
        },
        {
          label: 2,
          title: '女'
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
    span: 12,
    valueType: 'date',
    fieldProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    label: '兴趣爱好',
    dataIndex: 'aihao',
    valueType: 'checkbox',
    fieldProps: {
      checkboxGroup: [
        {
          label: '足球',
          title: '足球'
        },
        {
          label: '篮球',
          title: '篮球'
        },
        {
          label: '游戏',
          title: '游戏'
        }
      ]
    }
  },
  {
    label: '最高学历',
    dataIndex: 'xueli',
    valueType: 'select',
    span: 12,
    fieldProps: {
      style: {
        width: '100%'
      },
      options: [
        {
          label: '本科',
          value: 1
        },
        {
          label: '硕士',
          value: 2
        },
        {
          label: '博士',
          value: 3
        }
      ]
    }
  }
]

const handleFormSubmit = (form: any) => {
  console.log(form)
}
</script>
