import { defineStore } from "pinia"
import { ref } from "vue"

export const useJobStore = defineStore(
  "job",
  () => {
    const shouldAutoFocusJobActionButton = ref(false)

    return {
      shouldAutoFocusJobActionButton,
    }
  },
  {
    persist: true,
  }
)
