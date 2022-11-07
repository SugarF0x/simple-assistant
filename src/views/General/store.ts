import { defineStore } from "pinia"
import { ref } from "vue"

export const useGeneralStore = defineStore(
  "general",
  () => {
    const shouldDisableSwalGloom = ref(false)
    const lastSeenVersion = ref(chrome.runtime.getManifest().version)

    return {
      shouldDisableSwalGloom,
      lastSeenVersion,
    }
  },
  {
    persist: true,
  }
)
