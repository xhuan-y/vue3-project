<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive } from "vue";

const session = reactive(JSON.parse(localStorage.getItem("session")) || []);
const onClick = () => {
  const title = prompt("请输入会话标题");
  session.push({
    id: Date.now(),
    title,
  });
  localStorage.setItem("session", JSON.stringify(session));
};

const onDelete = (id) => {
  if (session.length === 1) {
    ElMessage.error("不能删除最后一条数据");
    return;
  }
  const index = session.findIndex((item) => item.id === id);
  session.splice(index, 1);
  localStorage.setItem("session", JSON.stringify(session));
};

const onEdit = (id) => {
  const index = session.findIndex((item) => item.id === id);
  const title = prompt("请修改会话标题", session[index].title);
  session.splice(index, 1, { id, title });
  localStorage.setItem("session", JSON.stringify(session));
};
</script>

<template>
  <div>
    <el-button type="primary" @click="onClick" class="btn">添加会话</el-button>
    <div class="title" v-for="item in session" :key="item.id">
      <span style="margin-right: 8px">{{ item.title }}</span>
      <el-link class="icon" :icon="Delete" @click="onDelete(item.id)"></el-link>
      <el-link class="icon" :icon="Edit" @click="onEdit(item.id)"></el-link>
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
  margin-bottom: 10px;
}

.icon {
  vertical-align: -2px;
  margin-right: 8px;
}
</style>
