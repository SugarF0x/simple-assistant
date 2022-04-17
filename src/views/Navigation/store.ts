import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useNavigationStore = defineStore(
  "navigation",
  () => {
    const shouldUseShortcuts = ref(false)
    const shouldEditShortcuts = ref(false)

    const urlToKeyMap = ref<Record<string, string>>({
      "/home": "Digit1",
      "/battle/menu": "Digit2",
      "/quests/viewall": "Digit3",
      "/jobs/viewall": "Digit4",
      "/tasks/viewall": "Digit5",
    })
    const keyToUrlMap = computed<Record<string, string>>(() =>
      Object.fromEntries(Object.entries(urlToKeyMap.value).map((e) => e.reverse()))
    )

    return {
      shouldUseShortcuts,
      shouldEditShortcuts,
      urlToKeyMap,
      keyToUrlMap,
    }
  },
  {
    persist: true,
  }
)
