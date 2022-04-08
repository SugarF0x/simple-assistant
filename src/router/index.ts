import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Arena, Battle, BattleMenu, Gather, Home, Quest, Travel } from "@/views"
import NotFound from "./NotFound.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/travel",
    name: "travel",
    component: Travel,
  },
  {
    path: "/npcs/attack/:id",
    // TODO: alias: "/worldboss/attack/:id",
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
  {
    path: "/:unknown(.*)",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
