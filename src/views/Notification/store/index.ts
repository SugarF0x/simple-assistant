import { defineStore } from "pinia"
import { useMahol } from "./useMahol"
import { useSafeMode } from "./useSafeMode"

export const useNotificationStore = defineStore(
  "notification",
  () => {
    return {
      ...useMahol(),
      ...useSafeMode(),
    }
  },
  {
    persist: true,
  }
)
