import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { getLondonTime, getTimeWithLondonOffset } from "@/utils"
import { MS_IN_DAY } from "@/consts"

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const shouldTrackTasks = ref(false)
    const shouldShowReminders = ref(false)

    const tasks = ref<Task[]>([])
    const lastUpdateTimestamp = ref<null | string>(null)

    function advanceTask(task: Task) {
      const index = tasks.value.indexOf(task)
      if (index < 0) throw new Error(`No task "${task.title}" found in tracker`)
      tasks.value[index] = {
        ...task,
        progress: Math.min(task.progress + 1, task.requirement),
      }
    }

    const isRewardCollected = ref(false)
    const areTasksComplete = computed(() => {
      if (!tasks.value.length) return false
      return tasks.value.every((entry) => entry.progress >= entry.requirement)
    })

    return {
      shouldTrackTasks,
      shouldShowReminders,
      tasks,
      lastUpdateTimestamp,
      advanceTask,
      isRewardCollected,
      areTasksComplete,
    }
  },
  {
    persist: {
      serializer: {
        deserialize: (store) => {
          const parsed = JSON.parse(store)
          if (!parsed.lastUpdateTimestamp) return parsed

          const date = new Date(parsed.lastUpdateTimestamp)
          const isNextDay =
            getLondonTime().valueOf() - MS_IN_DAY / 2 - getTimeWithLondonOffset(date).valueOf() >= MS_IN_DAY

          if (isNextDay) {
            parsed.tasks = []
            parsed.lastUpdateTimestamp = null
            parsed.isRewardCollected = false
          }
          return parsed
        },
        serialize: JSON.stringify,
      },
    },
  }
)

export enum TaskType {
  QUEST_SOME,
  QUEST_ANY,
  KILL_SOME,
  KILL_ANY,
  STEP,
  WORSHIP,
  VOTE,
  BUY,
  UNKNOWN,
}

export type ComplexTaskType = Extract<TaskType, TaskType.WORSHIP | TaskType.QUEST_SOME | TaskType.KILL_SOME>
const ComplexTaskTypes: ComplexTaskType[] = [TaskType.WORSHIP, TaskType.QUEST_SOME, TaskType.KILL_SOME]

export function isComplexTaskType(task: TaskType): task is ComplexTaskType {
  return ComplexTaskTypes.includes(task as ComplexTaskType)
}

export type BasicTask<T = TaskType> = {
  type: T
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
  location: string
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
