import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import { LOCAL_STORAGE_USER_REF } from "@/utils/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/signup",
      name: "sign-up",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUserName = localStorage.getItem(LOCAL_STORAGE_USER_REF);
  if (currentUserName && (to.name === "login" || to.name === "sign-up")) {
    return next({ name: "dashboard" });
  }
  if (!currentUserName && to.name !== "sign-up" && to.name !== "login") {
    return next({ name: "login" });
  }

  next();
});

export default router;
