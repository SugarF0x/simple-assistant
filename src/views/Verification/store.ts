import { defineStore } from "pinia"
import { ref } from "vue"

export const useVerificationStore = defineStore(
  "verification",
  () => {
    const shouldUseShortcuts = ref(false)
    const returnHref = ref("/")

    return {
      shouldUseShortcuts,
      returnHref,
    }
  },
  {
    persist: true,
  }
)
