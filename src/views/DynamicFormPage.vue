<script setup>
import DynamicForm from "@/components/DynamicForm.vue";

const formConfig = {
  fields: [
    {
      type: "el-input",
      label: "姓名",
      model: "name",
      props: {
        placeholder: "请输入姓名",
      },
      rules: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      // showIf: (formData) => {
      //   return formData.someOtherField === "certainValue";
      // },
      // asyncValidator: (rule, value) => {
      //   return new Promise((resolve, reject) => {
      //     // 这里可以调用API进行异步校验
      //     someApiCheck(value).then((response) => {
      //       if (response.isValid) {
      //         resolve();
      //       } else {
      //         reject("该值不可用");
      //       }
      //     });
      //   });
      // },
    },
    {
      type: "el-select",
      secondType: "el-option",
      label: "区域",
      model: "zone",
      props: {
        placeholder: "请选择区域",
      },
      options: [
        { label: "区域一", value: "1" },
        { label: "区域二", value: "2" },
      ],
      rules: [{ required: true, message: "区域不能为空", trigger: "blur" }],
    },
    {
      type: "el-switch",
      label: "状态",
      model: "state",
      defaultValue: "false",
    },
    {
      type: "el-checkbox-group",
      secondType: "el-checkbox",
      label: "类型",
      model: "type",
      options: [
        { label: "微信", value: "1" },
        { label: "支付宝", value: "2" },
        { label: "银行卡", value: "3" },
      ],
      rules: [{ required: true, message: "类型不能为空", trigger: "blur" }],
      defaultValue: [],
      showIf: (formData) => {
        return formData.state === true;
      },
    },
    {
      type: "el-radio-group",
      secondType: "el-radio",
      label: "性别",
      model: "sex",
      options: [
        { label: "男", value: "1" },
        { label: "女", value: "2" },
      ],
      rules: [{ required: true, message: "性别不能为空", trigger: "blur" }],
    },
    {
      type: "el-input",
      label: "建议",
      model: "suggest",
      props: {
        type: "textarea",
      },
    },
  ],
  onSubmit: (formData) => {
    console.log("表单提交成功, 表单数据:", formData);
    // 这里可以执行提交到服务器的操作
  },
  onSubmitFail: (errors) => {
    console.error("表单提交失败, 错误信息:", errors);
    // 这里可以执行一些错误处理，比如显示错误信息
  },
};
</script>

<template>
  <div style="width: 50%; text-align: center; margin: auto">
    <p>动态表单</p>
    <DynamicForm :formConfig="formConfig"></DynamicForm>
  </div>
</template>

<style scoped></style>
