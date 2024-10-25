<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const dialogVisible = ref(false);

const sessionItem = reactive({
  id: "",
  title: "",
});

const session = reactive(JSON.parse(localStorage.getItem("session")) || []);

const setSession = (session) => {
  localStorage.setItem("session", JSON.stringify(session));
};

const onUpdate = () => {
  if (sessionItem.title) {
    if (sessionItem.id) {
      const index = session.findIndex((item) => item.id === sessionItem.id);
      session.splice(index, 1, {
        id: sessionItem.id,
        title: sessionItem.title,
      });
    } else {
      session.push({
        id: Date.now(),
        title: sessionItem.title,
      });
    }
  } else {
    ElMessage.error("会话标题不能为空");
    return;
  }

  setSession(session);
  onQuit();
};

const onQuit = () => {
  sessionItem.id = "";
  sessionItem.title = "";
  dialogVisible.value = false;
};

const onDelete = (id) => {
  if (session.length === 1) {
    ElMessage.error("不能删除最后一条数据");
    return;
  }
  const index = session.findIndex((item) => item.id === id);
  session.splice(index, 1);
  setSession(session);
};

const onEdit = (id) => {
  dialogVisible.value = true;
  sessionItem.id = id;
  const index = session.findIndex((item) => item.id === id);
  sessionItem.title = session[index].title;
};
</script>

<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" class="btn"
      >添加会话</el-button
    >
    <div class="title" v-for="item in session" :key="item.id">
      <span style="margin-right: 8px">{{ item.title }}</span>
      <el-link class="icon" :icon="Delete" @click="onDelete(item.id)"></el-link>
      <el-link class="icon" :icon="Edit" @click="onEdit(item.id)"></el-link>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" width="400">
      {{ sessionItem.id ? "请修改会话标题：" : "请输入会话标题：" }}
      <el-input v-model="sessionItem.title"></el-input>
      <template #footer>
        <div>
          <el-button @click="onQuit">取消</el-button>
          <el-button type="primary" @click="onUpdate">确认</el-button>
        </div>
      </template>
    </el-dialog>
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
