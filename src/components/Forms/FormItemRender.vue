<script setup>
import { computed } from "vue";

const formItemValue = defineModel();

const { item } = defineProps(["item"]);

const uiType = computed(() => item.uiType);
</script>

<template>
  <el-form-item v-bind="item" :prop="item.field">
    <el-input
      v-if="uiType == 'input'"
      v-model="formItemValue"
      :placeholder="item.placeholder"
    ></el-input>

    <el-select
      v-else-if="uiType == 'select'"
      v-model="formItemValue"
      :placeholder="item.placeholder"
    >
      <template v-for="(option, i) in item.options" :key="i">
        <el-option :label="option.label" :value="option.value"></el-option>
      </template>
    </el-select>
  </el-form-item>
</template>

<style scoped></style>
