import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/new",
      name: "NewBookmarkPage",
      component: () => import("../views/NewBookmark.vue"),
    },
    {
      path: "/likes",
      name: "Likes",
      meta: {
        componentName: "BookmarkList",
      },
      component: () => import("../views/Account.vue"),
    },
    {
      path: "/favorites",
      name: "Favorites",
      meta: {
        componentName: "BookmarkList",
      },
      component: () => import("../views/Account.vue"),
    },
    {
      path: "/settings",
      name: "Settings",
      meta: {
        componentName: "userSettings",
      },
      component: () => import("../views/Account.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage", "Likes", "Favorites", "Settings"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
  const _isAuthenticated = useUserStore()._isAuthenticated;

  document.title = to.name;

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(from);
  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
