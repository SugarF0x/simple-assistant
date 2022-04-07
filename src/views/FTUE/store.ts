import { defineStore } from "pinia"
import { ref } from "vue"

export const useFtueStore = defineStore(
  "ftue",
  () => {
    const isDismissed = ref(false)

    return {
      isDismissed,
    }
  },
  {
    persist: true,
  }
)
