import { TaskCategory } from "@/views/Tasks/store/types"

export const taskCategoryToUrlMap: Record<TaskCategory, string> = {
  [TaskCategory.DAILY]: "/tasks/daily",
  [TaskCategory.WEEKLY]: "/tasks/weekly",
  [TaskCategory.MONTHLY]: "/tasks/monthly",
}
