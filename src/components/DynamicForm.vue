<script setup>
import { reactive, useTemplateRef, watch } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElSwitch,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
} from "element-plus";

// 注册 Element Plus 组件
const components = {
  ElInput,
  ElSelect,
  ElOption,
  ElSwitch,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
};

const { formConfig, formState } = defineProps({
  formConfig: {
    type: Object,
    required: true,
  },
  formState: {
    type: Object,
    default: () => ({ disabled: false, loading: false }),
  },
});

const formModel = reactive({});
const formRules = reactive({});
const dynamicForm = useTemplateRef("dynamicForm");

// 初始化表单模型和规则
formConfig.fields.forEach((field) => {
  formModel[field.model] = field.defaultValue || "";
  if (field.rules) {
    formRules[field.model] = field.rules;
  }
});

// 显示逻辑
const showField = (field) => {
  return !field.showIf || field.showIf(formModel);
};

// 获取对应的表单项组件
const getFieldComponent = (field) => {
  return components[field.type] || field.type;
};

const getSecondComponent = (field) => {
  return components[field.secondType] || field.secondType;
};

// 提交表单
const submitForm = () => {
  dynamicForm.value.validate((valid) => {
    if (valid) {
      // 表单验证成功，处理数据
      formConfig.onSubmit(formModel);
    } else {
      // 表单验证失败，提示用户
      formConfig.onSubmitFail("表单验证失败");
    }
  });
};

// 表单提交处理
const handleSubmit = () => {
  submitForm();
};

// 重置表单
const resetForm = () => {
  dynamicForm.value.resetFields();
};

// 监听表单状态变化
watch(
  () => formState,
  (newState) => {
    if (dynamicForm.value) {
      dynamicForm.value.loading = newState.loading;
      dynamicForm.value.disabled = newState.disabled;
    }
  },
  { deep: true }
);
</script>

<template>
  <el-form
    :model="formModel"
    :rules="formRules"
    ref="dynamicForm"
    @submit.prevent="handleSubmit"
    :disabled="formState.disabled"
    label-width="80"
  >
    <slot name="custom-layout">
      <!-- 默认布局 -->
    </slot>
    <!-- 动态生成表单项 -->
    <template v-for="field in formConfig.fields" :key="field.model">
      <el-form-item
        v-if="showField(field)"
        :label="field.label"
        :prop="field.model"
        :rules="field.rules"
      >
        <component
          :is="getFieldComponent(field)"
          v-model="formModel[field.model]"
          v-bind="field.props"
        >
          <template v-if="field.options">
            <component
              :is="getSecondComponent(field)"
              v-for="option in field.options"
              :key="option.value"
              v-bind="option"
            ></component>
          </template>
        </component>
      </el-form-item>
    </template>
    <!-- 表单操作按钮 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
