import { defineStore } from "pinia"
import { ref } from "vue"

export const useGatherStore = defineStore(
  "gather",
  () => {
    const shouldAutoFocusAction = ref(false)

    return {
      shouldAutoFocusAction,
    }
  },
  {
    persist: true,
  }
)
