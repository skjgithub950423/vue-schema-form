import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import BaseForm from "../views/BaseForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "基础表单",
      component: BaseForm,
    },
    {
      path: "/layout",
      name: "/layout",
      component: () => import("../views/LayoutForm.vue"),
    },
    {
      path: "/slot",
      name: "/slot",
      component: () => import("../views/SlotForm.vue"),
    },
    {
      path: "/dependency",
      name: "/dependency",
      component: () => import("../views/DependencyForm.vue"),
    }
  ],
});

export default router;
