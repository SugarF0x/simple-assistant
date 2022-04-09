import { defineStore } from "pinia"
import { useMahol } from "./mahol"

export const useNotificationStore = defineStore(
  "notification",
  () => {
    return {
      ...useMahol(),
    }
  },
  {
    persist: true,
  }
)
