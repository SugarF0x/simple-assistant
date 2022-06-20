import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { isAfter } from "date-fns"

export const useSafeModeStore = defineStore(
  "safeMode",
  () => {
    const shouldRemindSafeMode = ref(false)

    const expirationTimestamp = ref(new Date().toISOString())

    const isSafeModeExpired = computed(() => isAfter(new Date(expirationTimestamp.value), new Date()))

    const shouldShowSafeModeNotification = computed(() => shouldRemindSafeMode.value && isSafeModeExpired.value)

    return {
      shouldRemindSafeMode,
      expirationTimestamp,
      isSafeModeExpired,
      shouldShowSafeModeNotification,
    }
  },
  {
    persist: true,
  }
)
