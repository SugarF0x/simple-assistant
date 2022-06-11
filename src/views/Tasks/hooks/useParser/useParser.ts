import { getTask } from "./getTask"

export function useParser() {
  const nav = document.querySelector("nav.bg-white.rounded-lg.divide-y.divide-gray-200")
  if (!nav) return []

  const items = Array.from(nav.children) as HTMLElement[]
  if (!items.length) return []

  return items.map((e) => getTask(e))
}
