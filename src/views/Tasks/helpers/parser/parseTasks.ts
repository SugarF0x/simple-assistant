import { getTask } from "./getTask"
import { Task } from "@/views/Tasks/store"

export function parseTasks(): Task[] {
  const nav = document.querySelector(".web-app-container nav[aria-label=Sidebar]")
  if (!nav) throw new Error("Could not find tasks navigation container")

  const items = Array.from(nav.children) as HTMLElement[]
  if (!items.length) throw new Error("Could not find task items")

  return items.map(getTask)
}
