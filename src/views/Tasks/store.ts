import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useTasksStore = defineStore(
  "tasks",
  () => {
    const shouldTrackTasks = ref(false)

    const tasks = ref<Task[]>([])

    const areTasksComplete = computed(() => {
      if (!tasks.value.length) return false
      return tasks.value.every((entry) => entry.progress >= entry.requirement)
    })

    return {
      shouldTrackTasks,
      tasks,
      areTasksComplete,
    }
  },
  {
    persist: true,
  }
)

export enum TaskType {
  QUEST,
  KILL,
  STEP,
  WORSHIP,
  VOTE,
  BUY,
}

export type BasicTask<T = TaskType> = {
  type: T
  progress: number
  requirement: number
}

export type StepTask = BasicTask<TaskType.STEP>
export type VoteTask = BasicTask<TaskType.VOTE>
export type BuyTask = BasicTask<TaskType.BUY>

export interface KillTask extends BasicTask<TaskType.KILL> {
  target: string
  location: string
}

export interface QuestTask extends BasicTask<TaskType.QUEST> {
  target: string
}

export interface WorshipTask extends BasicTask<TaskType.WORSHIP> {
  target: string
}

export type Task = StepTask | VoteTask | BuyTask | KillTask | QuestTask | WorshipTask
