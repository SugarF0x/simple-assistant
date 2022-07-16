import { defineStore } from "pinia"
import { ref } from "vue"

export const useMarketStore = defineStore(
  "market",
  () => {
    const shouldAutoFocusFirstItem = ref(false)

    return {
      shouldAutoFocusFirstItem,
    }
  },
  {
    persist: true,
  }
)
