import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import {
  Arena,
  Battle,
  BattleMenu,
  Gather,
  Home,
  Quest,
  Travel,
  DailyReward,
  SafeMode,
  JobsMenu,
  Job,
  QuestsMenu,
  Carriage,
} from "@/views"
import NotFound from "./NotFound.vue"
import { Verification } from "@/views/Verification"

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
    path: "/horse-and-carriage",
    name: "carriage",
    component: Carriage,
  },
  {
    path: "/npcs/attack/:id",
    alias: "/worldboss/attack/:id",
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
    path: "/quests/viewall",
    name: "questsMenu",
    component: QuestsMenu,
  },
  {
    path: "/dailyreward",
    name: "dailyReward",
    component: DailyReward,
  },
  {
    path: "/safemode",
    name: "safemode",
    component: SafeMode,
  },
  {
    path: "/jobs/viewall",
    name: "jobsMenu",
    component: JobsMenu,
  },
  {
    path: "/jobs/view/:id",
    name: "job",
    component: Job,
  },
  {
    path: "/i-am-not-a-bot",
    name: "verification",
    component: Verification,
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
