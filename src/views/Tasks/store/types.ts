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
  BOARD = "BOARD",
  BUY = "BUY",
  MATERIAL = "MATERIAL",
  DUMP = "DUMP",
  TASK = "TASK",
  ORPHANAGE = "ORPHANAGE",
  LIBRARY = "LIBRARY",
  WAVE = "WAVE",
  KEY = "KEY",
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
