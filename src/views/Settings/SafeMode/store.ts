import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { MS_IN_DAY } from "@/consts"

export const useSafeModeStore = defineStore(
  "safeMode",
  () => {
    const shouldRemindSafeMode = ref(false)

    const lastSafeModeActivationTime = ref<null | string>(null)

    const isSafeModeNotificationDismissed = ref(false)
    const isSafeModeNotificationRequired = computed(() => {
      if (!shouldRemindSafeMode.value) return false
      if (!lastSafeModeActivationTime.value) return false
      if (isSafeModeNotificationDismissed.value) return false

      return Date.now() - new Date(lastSafeModeActivationTime.value).valueOf() > MS_IN_DAY
    })

    return {
      shouldRemindSafeMode,
      lastSafeModeActivationTime,
      isSafeModeNotificationDismissed,
      isSafeModeNotificationRequired,
    }
  },
  {
    persist: true,
  }
)
