<script setup>
import FormItemRender from "./FormItemRender.vue";
import { reactive, computed, useTemplateRef } from "vue";

const formInstance = useTemplateRef("formInstance");

const formData = defineModel();

const { formItems } = defineProps(["formItems"]);

let form = useForm(formItems);

function useForm(FormItems) {
  const form = reactive({
    data: {},
    rules: {},
    items: [],
  });

  const formItems = computed(() =>
    FormItems.map((item) => {
      return { ...item };
    })
  );

  form.rules = computed(() => collectFormRules(form.items));

  form.items = computed(() => {
    return formItems.value;
  });

  return form;
}

function collectFormRules(formItems) {
  return formItems.reduce((rules, formItem) => {
    if ((formItem.rule || []).length > 0) {
      rules[formItem.field] = formItem.rule;
    }
    if (formItem.required) {
      rules[formItem.field] = [
        {
          required: true,
          message: `${formItem.label}不能为空！`,
          trigger: "blur",
        },
      ];
    }
    return rules;
  }, {});
}

let getFormData = async () => {
  if (!formInstance.value) return;
  const isValid = await formInstance.value.validate();
  return isValid ? form.data : null;
};

const submit = async (callback) => {
  if (callback && typeof callback !== "function") {
    console.error(`submit 回调函数必须是方法`);
    return;
  }
  const formData1 = await getFormData();
  callback(formData1);
  formData.value = formData1;
  return formData1;
};

defineExpose({
  submit,
});
</script>

<template>
  <el-form ref="formInstance" :model="form.data" :rules="form.rules">
    <template v-for="item in form.items" :key="item.field">
      <FormItemRender
        :item="item"
        v-model="form.data[item.field]"
      ></FormItemRender>
    </template>
  </el-form>
</template>

<style scoped></style>
