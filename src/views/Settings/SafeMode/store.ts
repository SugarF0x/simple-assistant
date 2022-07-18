import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { isAfter } from "date-fns"

export const useSafeModeStore = defineStore(
  "safeMode",
  () => {
    const shouldRemindSafeMode = ref(false)
    const shouldDisplayRemainingTimeInHeader = ref(false)

    const expirationTimestamp = ref(new Date().toISOString())

    const isSafeModeExpired = computed(() => isAfter(new Date(), new Date(expirationTimestamp.value)))

    const shouldShowSafeModeNotification = computed(() => shouldRemindSafeMode.value && isSafeModeExpired.value)

    return {
      shouldRemindSafeMode,
      shouldDisplayRemainingTimeInHeader,
      expirationTimestamp,
      isSafeModeExpired,
      shouldShowSafeModeNotification,
    }
  },
  {
    persist: true,
  }
)
