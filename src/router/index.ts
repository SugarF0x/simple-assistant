import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Arena, Battle, Gather, Travel } from "@/views"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/travel",
    name: "travel",
    component: Travel,
  },
  {
    path: "/npcs/attack/:id",
    name: "battle",
    component: Battle,
  },
  {
    path: "/crafting/material/gather/:id",
    name: "gather",
    component: Gather,
  },
  {
    path: "/battle/menu",
    name: "arena",
    component: Arena,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
