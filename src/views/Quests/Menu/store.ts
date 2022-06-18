import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestsMenuStore = defineStore(
  "questsMenu",
  () => {
    const shouldElevateLastIncompleteQuest = ref(false)
    const shouldAutoFocusLastIncompleteQuest = ref(false)
    const shouldElevateTaskQuests = ref(false)
    const shouldAutoFocusTaskQuest = ref(false)

    return {
      shouldElevateLastIncompleteQuest,
      shouldAutoFocusLastIncompleteQuest,
      shouldElevateTaskQuests,
      shouldAutoFocusTaskQuest,
    }
  },
  {
    persist: true,
  }
)
