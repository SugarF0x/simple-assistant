import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Arena, Battle, BattleMenu, Gather, Quest, Travel } from "@/views"

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
    path: "/battlearena",
    name: "arena",
    component: Arena,
  },
  {
    path: "/battle/menu",
    name: "battle menu",
    component: BattleMenu,
  },
  {
    path: "/quests/view/:id",
    name: "quest",
    component: Quest,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
