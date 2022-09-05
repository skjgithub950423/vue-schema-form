<script setup lang="ts">
import { reactive, ref,watch } from 'vue';
import SchemaForm from '@/components/form/index.vue';
import type { FormInstance } from 'element-plus'
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
    },5000)
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
    span:24,
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
            required:true
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
  },
  {
    label: '状态1',
    dataIndex: 'state1',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态2',
    dataIndex: 'state2',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态3',
    dataIndex: 'state3',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态4',
    dataIndex: 'state4',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态5',
    dataIndex: 'state5',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },{
    label: '状态6',
    dataIndex: 'state6',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },{
    label: '状态7',
    dataIndex: 'state7',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },{
    label: '状态8',
    dataIndex: 'state8',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态9',
    dataIndex: 'state9',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态10',
    dataIndex: 'state10',
    valueType: 'select',
    dependencies: ['title'],
    fieldProps: {
      request: test,
    }
  },
  {
    label: '状态11',
    dataIndex: 'state11',
    valueType: 'select',
    dependencies: ['title'],
    formItemProps:{
      rules:[
        {
          required:true
        }
      ]
    },
    fieldProps: {
      request: test,
    }
  },
];
const proFormRef = ref<FormInstance>()
const form = reactive({})
const handleBtnClick = async () => {
  // proFormRef.value?.scrollToField('state8')
  proFormRef.value?.resetFields(['title'])
  // await proFormRef.value?.validate((valid, fields) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
}

const handleOnSubmit = (form) => {
  console.log(form,'-----fadfafafaf')
}

watch(() => form.title,() => {
  console.log(form)
})
</script>

<template>
  <el-button type="primary" @click="handleBtnClick">提交</el-button>
  <main>
    <SchemaForm
      :columns="columns"
      ref="proFormRef"
      label-position="top"
      label-width="100px"
      :initialValue="{title:'cccccc'}"
      :gutter="5"
    >
    <template #header>
      <h1>测试表单</h1>
    </template>
  </SchemaForm>
  </main>
</template>
