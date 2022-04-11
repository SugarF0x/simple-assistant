import { defineStore } from "pinia"
import { ref } from "vue"

export const useJobsMenuStore = defineStore(
  "jobsMenu",
  () => {
    const shouldAutoFocusGotoJobButton = ref(false)

    return {
      shouldAutoFocusGotoJobButton,
    }
  },
  {
    persist: true,
  }
)
