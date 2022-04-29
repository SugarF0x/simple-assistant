import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { MS_IN_DAY } from "@/consts"

export const useSafeModeStore = defineStore(
  "safeMode",
  () => {
    const shouldRemindSafeMode = ref(false)

    const lastSafeModeActivationTime = ref<null | string>(null)

    const isSafeModeExpired = computed(() => {
      if (!lastSafeModeActivationTime.value) return false
      return Date.now() - new Date(lastSafeModeActivationTime.value).valueOf() > MS_IN_DAY
    })

    const shouldShowSafeModeNotification = computed(() => shouldRemindSafeMode.value && isSafeModeExpired.value)

    return {
      shouldRemindSafeMode,
      lastSafeModeActivationTime,
      shouldShowSafeModeNotification,
    }
  },
  {
    persist: true,
  }
)
