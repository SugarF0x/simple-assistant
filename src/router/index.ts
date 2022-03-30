import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Travel } from "@/views"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/travel",
    name: "travel",
    component: Travel,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
