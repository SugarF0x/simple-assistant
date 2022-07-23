import { TaskType } from "../../store"
import { getCardText } from "@/views/Tasks/hooks/useParser/utils"

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
  const text = getCardText(el)
  const [_, type] = regexpToTypeMap.find(([regexp]) => text.match(regexp)) ?? []
  return type ?? TaskType.UNKNOWN
}
