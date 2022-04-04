import { defineStore } from "pinia"
import { ref } from "vue"

export const useArenaStore = defineStore(
  "arena",
  () => {
    const shouldAutoFocusGenerate = ref(false)

    return {
      shouldAutoFocusGenerate,
    }
  },
  {
    persist: true,
  }
)
