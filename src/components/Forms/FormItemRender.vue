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
      <template v-for="option in item.options" :key="option.value">
        <el-option :label="option.label" :value="option.value"></el-option>
      </template>
    </el-select>

    <el-checkbox-group v-else-if="uiType == 'checkbox'" v-model="formItemValue">
      <template v-for="option in item.options" :key="option.value">
        <el-checkbox :value="option.value">
          {{ option.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<style scoped></style>
