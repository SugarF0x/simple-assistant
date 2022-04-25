import { defineStore } from "pinia"
import { ref } from "vue"

export const useCarriageStore = defineStore(
  "carriage",
  () => {
    const shouldShowTravelDestinationDetails = ref(false)

    return {
      shouldShowTravelDestinationDetails,
    }
  },
  {
    persist: true,
  }
)
