import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestStore = defineStore(
  "arena",
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
