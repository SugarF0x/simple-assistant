import { CategoryMap, TaskCategory } from "../types"

export function getInitialCategoryMap<T>(value: T): CategoryMap<T> {
  return {
    [TaskCategory.DAILY]: structuredClone(value),
    [TaskCategory.WEEKLY]: structuredClone(value),
    [TaskCategory.MONTHLY]: structuredClone(value),
  }
}

export function mapCategoryMap<T>(mapper: (category: TaskCategory) => T): CategoryMap<T> {
  return {
    [TaskCategory.DAILY]: mapper(TaskCategory.DAILY),
    [TaskCategory.WEEKLY]: mapper(TaskCategory.WEEKLY),
    [TaskCategory.MONTHLY]: mapper(TaskCategory.MONTHLY),
  }
}
