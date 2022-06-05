import { Task, TaskType } from "../../store"
import { getType } from "@/views/Tasks/hooks/useParser/getType"

export function useParser() {
  const nav = document.querySelector("nav.bg-white.rounded-lg.divide-y.divide-gray-200")
  if (!nav) return

  const items = Array.from(nav.children) as HTMLElement[]
  if (!items.length) return
}
