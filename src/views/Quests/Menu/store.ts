import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestsMenuStore = defineStore(
  "questsMenu",
  () => {
    const shouldElevateLastIncompleteQuest = ref(false)
    const shouldAutoFocusLastIncompleteQuest = ref(false)

    return {
      shouldElevateLastIncompleteQuest,
      shouldAutoFocusLastIncompleteQuest,
    }
  },
  {
    persist: true,
  }
)
