import { TaskType, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { wrapQuestLiWithButton } from "./wrapQuestLiWithButton"
import { getQuestListElement } from "./getQuestListElement"

export const LAST_INCOMPLETE_QUEST_ID = "last-incomplete-quest"
export const INCOMPLETE_QUEST_CLASS = "incomplete-quest"
export const TASK_QUEST_CLASS = "task-quest"

export function markQuests() {
  const tasksStore = useTasksStore()
  const { allTasks } = storeToRefs(tasksStore)

  const questTasks = computed(() => allTasks.value.filter((task) => task.type === TaskType.QUEST))
  const questUrls = computed(() => questTasks.value.map((task) => task.url))

  const questListElement = getQuestListElement()

  let isLastIncompleteFound = false

  for (const questElement of Array.from(questListElement.children).reverse() as HTMLUListElement[]) {
    const button = wrapQuestLiWithButton(questElement)
    const url = button.getAttribute("onclick")?.match(/\/quests\/.+\?/)?.[0] ?? "unreachable"

    if (!button.querySelector("svg")) {
      if (!isLastIncompleteFound) {
        isLastIncompleteFound = true
        button.id = LAST_INCOMPLETE_QUEST_ID
      }
      button.classList.add(INCOMPLETE_QUEST_CLASS)
    }

    if (questUrls.value.some(questUrl => questUrl.includes(url))) button.classList.add(TASK_QUEST_CLASS)
  }
}
