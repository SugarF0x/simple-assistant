export enum TaskCategory {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export type CategoryMap<T> = Record<TaskCategory, T>

export enum TaskType {
  QUEST = "QUEST",
  KILL = "KILL",
  STEP = "STEP",
  WORSHIP = "WORSHIP",
  VOTE = "VOTE",
  BUY = "BUY",
  MATERIAL = "MATERIAL",
  DUMP = "DUMP",
  TASK = "TASK",
  ORPHANAGE = "ORPHANAGE",
  LIBRARY = "LIBRARY",
  WAVE = "WAVE",
  UNKNOWN = "UNKNOWN",
}

export type Task = {
  type: TaskType
  category: TaskCategory
  title: string
  icon: string
  progress: number
  requirement: number
  url: string
  isRedeemed: boolean
}
