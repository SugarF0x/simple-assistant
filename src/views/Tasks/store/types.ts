export enum TaskCategory {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export type CategoryMap<T> = Record<TaskCategory, T>

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
