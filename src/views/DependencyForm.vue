<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import SchemaForm from '@/components/form/index.vue'
import type { FormInstance } from 'element-plus'
import type { IColumn } from '@/components/form/index.vue'
const promise = (sex: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = []
      if (sex === 1) {
        result = [
          {
            label: '足球',
            value: 'football'
          },
          {
            label: '篮球',
            value: 'baskedball'
          }
        ]
      } else if (sex === 2) {
        result = [
          {
            label: '逛街',
            value: 'guangjie'
          },
          {
            label: '自拍',
            value: '自拍'
          }
        ]
      }
      resolve(result)
    }, 5000, sex)
  })
}
const test = async (form: any) => {
  const haha = await promise(form.sex)
  console.log(haha,'-----haha')
  return haha
}

const columns: IColumn[] = [
  {
    label: '姓名',
    dataIndex: 'name',
    valueType: 'text',
    span: 24,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    },
    fieldProps: {
      placeholder: 'haha',
      type: 'textarea'
      // disabled: true,
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
    name: ['sex'],
    valueType: 'dependency',
    column: ([sex]) => {
      let result = []
      if (sex === 1) {
        result = [
          {
            label: '身高',
            valueType: 'text',
            dataIndex: 'shengao'
          },
          {
            label: '体重',
            valueType: 'text',
            dataIndex: '体重'
          }
        ]
      } else if (sex === 2) {
        result = [
          {
            label: '入职时间',
            valueType: 'datetime',
            dataIndex: 'time'
          }
        ]
      }
      return result
    }
  },
  {
    label: '兴趣爱好',
    dataIndex: 'state',
    valueType: 'select',
    dependencies: ['sex'],
    fieldProps: {
      request: test
    }
  },
  {
    label: '哈哈',
    valueType: 'text',
    dataIndex: 'heihei',
    dependencies: ['sex'],
    formItemProps: (form: any) => {
      return form.sex === 1
        ? {
            rules: [
              {
                required: false
              }
            ]
          }
        : {
            rules: [
              {
                required: true,
                message: '此项为必填项'
              }
            ]
          }
    }
  }
]
const proFormRef = ref<FormInstance>()
</script>

<template>
  <main>
    <SchemaForm
      :columns="columns"
      ref="proFormRef"
      label-position="top"
      label-width="100px"
      :initialValue="{ title: 'cccccc' }"
      :gutter="5"
    >
    </SchemaForm>
  </main>
</template>
