import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestStore = defineStore(
  "quest",
  () => {
    const shouldAutoFocusPerform = ref(false)
    const shouldAutoFocusVerification = ref(false)

    return {
      shouldAutoFocusPerform,
      shouldAutoFocusVerification,
    }
  },
  {
    persist: true,
  }
)
