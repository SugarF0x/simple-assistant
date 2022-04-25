import { defineStore } from "pinia"
import { ref } from "vue"

export const useCarriageStore = defineStore(
  "carriage",
  () => {
    const shouldShowTravelDestinationDetails = ref(false)
    const shouldHighlightBestStats = ref(false)

    return {
      shouldShowTravelDestinationDetails,
      shouldHighlightBestStats,
    }
  },
  {
    persist: true,
  }
)
