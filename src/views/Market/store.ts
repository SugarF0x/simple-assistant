import { defineStore } from "pinia"
import { ref } from "vue"

export const useMarketStore = defineStore(
  "market",
  () => {
    const shouldAutoFocusFirstItem = ref(false)
    const shouldTrackPurchaseTask = ref(false)

    return {
      shouldAutoFocusFirstItem,
      shouldTrackPurchaseTask,
    }
  },
  {
    persist: true,
  }
)
