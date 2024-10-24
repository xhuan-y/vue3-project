<script setup>
import { reactive } from "vue";
const session = reactive([]);
const onClick = () => {
  const title = prompt("请输入会话标题");
  session.push({
    id: Date.now(),
    title,
  });
};
</script>

<template>
  <div>
    <el-button type="primary" @click="onClick" class="btn">添加会话</el-button>
    <div class="title" v-for="item in session" :key="item.id">
      <span>{{ item.title }}</span>
      <Delete class="icon" />
      <Edit class="icon" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 200px;
  margin-bottom: 10px;
}
.title {
  height: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px, solid rgb(214, 102, 102);
  border-radius: 3px;
}
.icon {
  width: 1em;
  height: 1em;
  margin-left: 8px;
  vertical-align: -2px;
}
</style>
