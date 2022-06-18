import { defineStore } from "pinia"
import { ref } from "vue"

export const useGeneralStore = defineStore(
  "general",
  () => {
    const shouldDisableSwalGloom = ref(false)

    return {
      shouldDisableSwalGloom,
    }
  },
  {
    persist: true,
  }
)
