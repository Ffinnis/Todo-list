import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TodoList",
    component: () => import("@/views/TodoList.vue"),
  },
  {
    path: "/create",
    name: "CreateTodo",
    component: () => import("../views/CreateTodo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
