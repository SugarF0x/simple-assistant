import { defineStore } from "pinia"
import { ref } from "vue"

export const useQuestsMenuStore = defineStore(
  "questsMenu",
  () => {
    const shouldElevateLastIncompleteQuest = ref(false)

    return {
      shouldElevateLastIncompleteQuest,
    }
  },
  {
    persist: true,
  }
)
