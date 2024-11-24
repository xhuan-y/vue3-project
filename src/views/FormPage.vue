<script setup>
import FormRender from "@/components/Forms/FormRender.vue";
import { ref, useTemplateRef } from "vue";

const formData = ref(null);

const formItems = [
  {
    label: "用户名",
    field: "username",
    required: true,
    uiType: "input",
  },
];

const formInstance = useTemplateRef("formInstance");
const submit = () => {
  formInstance.value.submit((form) => {
    console.log("submit", form);
  });
};
</script>

<template>
  <div style="width: 50%; text-align: center; margin: auto">
    <p>动态表单</p>
    <FormRender
      ref="formInstance"
      v-model="formData"
      :formItems="formItems"
    ></FormRender>
    <el-button @click="submit">提交信息</el-button>
    <p>{{ formData }}</p>
  </div>
</template>

<style scoped></style>
