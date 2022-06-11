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
  QUEST_SOME = "Complete particular quest",
  QUEST_ANY = "Complete any quest",
  KILL_SOME = "Kill some NPC",
  KILL_ANY = "Kill and NPC",
  STEP = "Perform steps",
  WORSHIP = "Worship",
  VOTE = "Vote",
  BUY = "Buy from market",
  UNKNOWN = "Unknown",
}

export type ComplexTaskType = Extract<TaskType, TaskType.WORSHIP | TaskType.QUEST_SOME | TaskType.KILL_SOME>
const ComplexTaskTypes: ComplexTaskType[] = [TaskType.WORSHIP, TaskType.QUEST_SOME, TaskType.KILL_SOME]

export function isComplexTaskType(task: TaskType): task is ComplexTaskType {
  return ComplexTaskTypes.includes(task as ComplexTaskType)
}

export type BasicTask<T = TaskType> = {
  type: T
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
