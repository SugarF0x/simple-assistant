import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestStore = defineStore(
  "quest",
  () => {
    const shouldAutoFocusPerform = ref(false)
    const shouldAutoFocusVerification = ref(false)
    const shouldTrackTaskQuests = ref(false)

    return {
      shouldAutoFocusPerform,
      shouldAutoFocusVerification,
      shouldTrackTaskQuests,
    }
  },
  {
    persist: true,
  }
)
