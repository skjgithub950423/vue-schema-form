<template>
  <SchemaForm ref="proFormRef" :columns="columns" :label-width="100">
    <template #header>
      <el-row justify="center">
        <h3>测试表单</h3>
      </el-row>
    </template>
    <template #footer>
      <el-row justify="center">
        <el-space>
          <el-button type="primary" @click="clearValidate">清除校验</el-button>
          <el-button type="primary" @click="resetFields">重置姓名</el-button>
          <el-button type="primary" @click="scrollToField">滚动到姓名</el-button>
          <el-button type="primary" @click="validate">校验</el-button>
          <el-button type="primary" @click="validateField">校验年龄</el-button>
        </el-space>
      </el-row>
    </template>
  </SchemaForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SchemaForm from '@/components/form/index.vue'
import type { FormInstance } from 'element-plus'
const addColumns = []
for (let i = 0; i < 20; i++) {
  addColumns.push({
    label: `表单项${i}`,
    dataIndex: `formItem${i}`,
    valueType: 'text',
    fieldProps: {
      placeholder: '演示用表单项'
    }
  })
}
const proFormRef = ref<FormInstance>()
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
    formItemProps: {
      rules: [
        {
          required: true,
          message: '年龄必填'
        }
      ]
    },
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
  },
  ...addColumns
]

const resetFields = () => {
  proFormRef.value?.resetFields(['name'])
}

const validate = async () => {
  await proFormRef.value?.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const validateField = async () => {
  await proFormRef.value?.validateField(['name'], (valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const clearValidate = () => {
  proFormRef.value?.clearValidate(['name'])
}

const scrollToField = () => {
  proFormRef.value?.scrollToField('name')
}
</script>
