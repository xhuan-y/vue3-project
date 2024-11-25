import { createRouter, createWebHistory } from "vue-router";
import DynamicFormPage from "@/views/DynamicFormPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DynamicFormPage,
    },
    {
      path: "/session",
      name: "session",
      component: () => import("@/views/SessionPage.vue"),
    },
  ],
});

export default router;
