import { defineStore } from "pinia"
import { ref } from "vue"

export const useJobStore = defineStore(
  "job",
  () => {
    const shouldAutoFocusJobActionButton = ref(false)
    const shouldNotifyOnCompletion = ref(false)

    return {
      shouldAutoFocusJobActionButton,
      shouldNotifyOnCompletion,
    }
  },
  {
    persist: true,
  }
)
