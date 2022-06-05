import { TaskType } from "../../store"

const regexpToTypeMap: Array<[RegExp, TaskType]> = [
  [/kill.*times/gi, TaskType.KILL_SOME],
  [/kill/gi, TaskType.KILL_ANY],
  [/worship/gi, TaskType.WORSHIP],
  [/steps/gi, TaskType.STEP],
  [/quest.*times/gi, TaskType.QUEST_SOME],
  [/quest/gi, TaskType.QUEST_ANY],
  [/buy/gi, TaskType.BUY],
  [/vote/gi, TaskType.VOTE],
]

export function getType(el: HTMLElement): TaskType {
  const text = el.querySelector<HTMLSpanElement>("span.truncate")?.innerText || ""
  const [_, type] = regexpToTypeMap.find(([regexp]) => text.match(regexp)) ?? []
  return type ?? TaskType.UNKNOWN
}
