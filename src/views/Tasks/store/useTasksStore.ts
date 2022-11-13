import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { persist, mapCategoryMap, getInitialCategoryMap } from "./helpers"
import { CategoryMap, Task, TaskCategory } from "./types"

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const version = ref(1)

    const shouldTrackTasks = ref(false)
    const shouldShowReminders = ref(false)

    const tasks = ref<CategoryMap<Task[]>>(getInitialCategoryMap([]))
    const resetTimestamp = ref<CategoryMap<string | null>>(getInitialCategoryMap(null))

    function getIsRewardReady(category: TaskCategory): boolean {
      return tasks.value[category].filter((entry) => entry.progress >= entry.requirement).length >= 5
    }

    const isRewardReady = computed<CategoryMap<boolean>>(() => mapCategoryMap(getIsRewardReady))
    const isRewardCollected = ref<CategoryMap<boolean>>(getInitialCategoryMap(false))

    function advanceTask(task: Task) {
      const { category } = task

      const index = tasks.value[category].indexOf(task)
      if (index < 0) throw new Error(`No task "${task.title}" found in tracker`)

      tasks.value[category][index] = {
        ...task,
        progress: Math.min(task.progress + 1, task.requirement),
      }
    }

    return {
      version,
      shouldTrackTasks,
      shouldShowReminders,
      tasks,
      resetTimestamp,
      advanceTask,
      isRewardCollected,
      isRewardReady,
    }
  },
  { persist }
)
