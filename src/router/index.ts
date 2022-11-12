import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import {
  Arena,
  Battle,
  BattleMenu,
  Bosses,
  Carriage,
  DailyReward,
  Gather,
  Home,
  Job,
  JobsMenu,
  Market,
  MonthlyReward,
  Quest,
  QuestsMenu,
  SafeMode,
  Tasks,
  Travel,
} from "@/views"
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
    path: "/market/listings",
    name: "market",
    component: Market,
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
    path: "/battle/arena",
    name: "arena",
    component: Arena,
  },
  {
    path: "/battle/world-bosses",
    name: "bosses",
    component: Bosses,
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
    path: "/tasks/viewall",
    alias: ["/tasks/daily", "/tasks/weekly", "/tasks/monthly"],
    name: "tasks",
    component: Tasks,
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
    path: "/monthlyreward",
    name: "monthlyReward",
    component: MonthlyReward,
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
    path: "/:unknown(.*)",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
