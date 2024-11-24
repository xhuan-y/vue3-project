import { createRouter, createWebHistory } from "vue-router";
import FormPage from "@/views/FormPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: FormPage,
    },
    {
      path: "/session",
      name: "session",
      component: () => import("@/views/SessionPage.vue"),
    },
  ],
});

export default router;
