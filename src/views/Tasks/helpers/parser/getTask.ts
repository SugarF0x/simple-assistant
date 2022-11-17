import { Task, TaskCategory, TaskType } from "../../store"
import { ORIGIN } from "~/consts"

export function getTask(el: HTMLElement): Task {
  const [progress, requirement] = getProgress(el)
  const category = getCategory()
  const icon = getIconUrl(el)
  const isRedeemed = getIsRedeemed(el)
  const title = getTitle(el)
  const type = getType(el)
  const url = getUrl(el)

  return {
    category,
    icon,
    isRedeemed,
    progress,
    requirement,
    title,
    type,
    url,
  }
}

export function getCategory(): TaskCategory {
  const path = location.pathname.split("/")[2]

  if (["daily", "viewall"].includes(path)) return TaskCategory.DAILY
  if (path === "weekly") return TaskCategory.WEEKLY
  if (path === "monthly") return TaskCategory.MONTHLY

  throw new Error("Task category not found in path")
}

const keywordToTaskTypeMap: Record<string, TaskType> = {
  quest: TaskType.QUEST,
  worship: TaskType.WORSHIP,
  step: TaskType.STEP,
  task: TaskType.TASK,
  kill: TaskType.KILL,
  defeat: TaskType.KILL,
  purchase: TaskType.BUY,
  find: TaskType.MATERIAL,
  dump: TaskType.DUMP,
  book: TaskType.LIBRARY,
  board: TaskType.BOARD,
  key: TaskType.KEY,
  wave: TaskType.WAVE,

  // TODO: confirm these
  orphanage: TaskType.ORPHANAGE,
}

function getType(el: HTMLElement): TaskType {
  const text = getTitle(el).toLowerCase()

  for (const [key, type] of Object.entries(keywordToTaskTypeMap)) {
    if (text.includes(key)) return type
  }

  return TaskType.UNKNOWN
}

function getProgress(el: HTMLElement): [number, number] {
  const progressElement = el.querySelector<HTMLDivElement>("div > div:last-child > div:first-child")
  return (progressElement?.innerText.split(" / ").map((e) => Number(e)) as [number, number]) ?? [0, 0]
}

function getIsRedeemed(el: HTMLElement): boolean {
  return !el.querySelector("button")
}

function getTitle(el: HTMLElement): string {
  return el.querySelector<HTMLDivElement>("div > div:first-child")?.innerText ?? ""
}

function getIconUrl(el: HTMLElement): string {
  return el.querySelector("img")?.src.replace(ORIGIN, "") ?? ""
}

function getUrl(el: HTMLElement): string {
  return el.querySelector("a")?.href.replace(ORIGIN, "") ?? ""
}
