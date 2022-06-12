import { defineStore } from "pinia"
import { ref } from "vue"

export const useCarriageStore = defineStore(
  "carriage",
  () => {
    const shouldShowTravelDestinationDetails = ref(false)
    const shouldHighlightBestStats = ref(false)
    const shouldHighlightTrackedZones = ref(false)

    return {
      shouldShowTravelDestinationDetails,
      shouldHighlightBestStats,
      shouldHighlightTrackedZones,
    }
  },
  {
    persist: true,
  }
)
