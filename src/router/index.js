import { createRouter, createWebHistory } from "vue-router";

// import HomeView from '@/views/TodosView.vue'
import TodosView from "@/views/TodosView.vue";
// import AboutView from "@/views/AboutView.vue";

const routes = [
  { path: "/", name: "todos", component: TodosView },
  { path: "/about-us", name: "about", component: ()=> import("@/views/AboutView.vue") }, // Lazy loading component technique
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
