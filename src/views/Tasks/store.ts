import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { createMigration } from "@/utils"
import { isAfter } from "date-fns"

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
  {
    persist: {
      serializer: {
        deserialize: (store) => {
          const state = migrate(JSON.parse(store))

          for (const category of Object.keys(state.resetTimestamp)) {
            const timestamp = state.resetTimestamp[category]
            if (!timestamp) continue

            if (!isAfter(new Date(), new Date(timestamp))) continue

            state.resetTimestamp[category] = null
            state.tasks[category] = []
            state.isRewardCollected[category] = false
          }

          return state
        },
        serialize: JSON.stringify,
      },
    },
  }
)

type CategoryMap<T> = Record<TaskCategory, T>

function getInitialCategoryMap<T>(value: T): CategoryMap<T> {
  return {
    [TaskCategory.DAILY]: structuredClone(value),
    [TaskCategory.WEEKLY]: structuredClone(value),
    [TaskCategory.MONTHLY]: structuredClone(value),
  }
}

function mapCategoryMap<T>(mapper: (category: TaskCategory) => T): CategoryMap<T> {
  return {
    [TaskCategory.DAILY]: mapper(TaskCategory.DAILY),
    [TaskCategory.WEEKLY]: mapper(TaskCategory.WEEKLY),
    [TaskCategory.MONTHLY]: mapper(TaskCategory.MONTHLY),
  }
}

const migrate = createMigration([
  (state) => {
    delete state.tasks
    delete state.lastUpdateTimestamp
    delete state.isRewardCollected

    return state
  },
])

export enum TaskCategory {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum TaskType {
  QUEST_SOME = "QUEST_SOME",
  QUEST_ANY = "QUEST_ANY",
  KILL_SOME = "KILL_SOME",
  KILL_ANY = "KILL_ANY",
  STEP = "STEP",
  WORSHIP = "WORSHIP",
  VOTE = "VOTE",
  BUY = "BUY",
  UNKNOWN = "UNKNOWN",
}

export type ComplexTaskType = Extract<TaskType, TaskType.WORSHIP | TaskType.QUEST_SOME | TaskType.KILL_SOME>
const ComplexTaskTypes: ComplexTaskType[] = [TaskType.WORSHIP, TaskType.QUEST_SOME, TaskType.KILL_SOME]

export function isComplexTaskType(task: TaskType): task is ComplexTaskType {
  return ComplexTaskTypes.includes(task as ComplexTaskType)
}

export type BasicTask<T = TaskType> = {
  type: T
  category: TaskCategory
  title: string
  icon: string
  progress: number
  requirement: number
}

export type KillAnyTask = BasicTask<TaskType.KILL_ANY>
export type QuestAnyTask = BasicTask<TaskType.QUEST_ANY>
export type StepTask = BasicTask<TaskType.STEP>
export type VoteTask = BasicTask<TaskType.VOTE>
export type BuyTask = BasicTask<TaskType.BUY>
export type UnknownTask = BasicTask<TaskType.UNKNOWN>

export interface KillSomeTask extends BasicTask<TaskType.KILL_SOME> {
  target: string
  locations: string[]
}

export interface QuestSomeTask extends BasicTask<TaskType.QUEST_SOME> {
  target: string
}

export interface WorshipTask extends BasicTask<TaskType.WORSHIP> {
  target: string
}

export type Task =
  | StepTask
  | VoteTask
  | BuyTask
  | KillSomeTask
  | QuestSomeTask
  | UnknownTask
  | WorshipTask
  | KillAnyTask
  | QuestAnyTask
