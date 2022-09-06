## Vue schema form
> 基于schma配置动态生成表单

## 介绍
灵感来自于[pro-component中的SchemaForm](http://https://procomponents.ant.design/components/schema-form "pro-component中的SchemaForm"),是基于antd的Form组件进行业务级别的抽象，预置表单常用的使用方法，进行二次封装，本项目也是类似的思路，只不过是基于vue和element-plus的Form组件进行的二次封装

### 技术栈
vue3 + element-plus + typescript

## 功能和示例
### 基础表单
>支持通过接收一个配置的数组来生成表单

```javascript
<template>
  <SchemaForm 
    :columns="columns" 
    :label-width="100"
    @on-submit="handleFormSubmit"
></SchemaForm>
</template>
<script setup lang="ts">
import SchemaForm from 'vue-schema-form'
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
```

### 表单联动
> 支持动态生成表单项，动态获取select数据，动态修改formItemProps和fieldProps

```javascript
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import SchemaForm from 'vue-schema-form'
import type { FormInstance } from 'element-plus'
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
        ;[
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
    }, 5000)
  })
}
const test = async (form: any) => {
  const haha = await promise(form.sex)
  return haha
}
const columns = [
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
  // 动态生成表单项
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
  // select异步获取数据
  {
    label: '兴趣爱好',
    dataIndex: 'state',
    valueType: 'select',
    dependencies: ['sex'],
    fieldProps: {
      request: test
    }
  },
  // 动态修改formItemProps
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
    <SchemaForm
      :columns="columns"
      ref="proFormRef"
      label-position="top"
      label-width="100px"
      :initialValue="{ title: 'cccccc' }"
      :gutter="5"
    >
    </SchemaForm>
</template>
```
### valueType支持类型
- text
- number
- select
- radio
- checkbox
- cascader
- switch
- slider
- time
- date
- datetime
- rate
- dependency

## 其他
效果和更多详细示例请将项目clone到本地运行后查看
