import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestStore = defineStore(
  "quest",
  () => {
    const shouldAutoFocusPerform = ref(false)

    return {
      shouldAutoFocusPerform,
    }
  },
  {
    persist: true,
  }
)
