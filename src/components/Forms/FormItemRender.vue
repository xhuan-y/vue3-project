<script setup>
import { computed } from "vue";

const formItemValue = defineModel();
const { item } = defineProps(["item"]);

const uiType = computed(() => item.uiType);
</script>

<template>
  <el-form-item v-bind="item" :prop="item.field">
    <el-input v-if="uiType == 'input'" v-model="formItemValue"></el-input>
  </el-form-item>
</template>

<style scoped></style>
