import { defineStore } from "pinia"
import { ref } from "vue"

export const useHomeStore = defineStore(
  "home",
  () => {
    const shouldAutoFocusTravel = ref(false)

    return {
      shouldAutoFocusTravel,
    }
  },
  {
    persist: true,
  }
)
