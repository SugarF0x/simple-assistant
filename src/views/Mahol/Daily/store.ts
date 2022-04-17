import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { MS_IN_DAY } from "@/consts"
import { getTimeWithLondonOffset, getLondonTime } from "@/utils"

export const useMaholDailyStore = defineStore(
  "maholDaily",
  () => {
    const shouldRemindDailyReward = ref(false)

    const lastRewardClaimTimestamp = ref<string | null>(null)

    const isDailyRewardReady = computed(() => {
      if (!lastRewardClaimTimestamp.value) return false

      return (
        getLondonTime().valueOf() -
          MS_IN_DAY / 2 -
          getTimeWithLondonOffset(new Date(lastRewardClaimTimestamp.value)).valueOf() >=
        MS_IN_DAY
      )
    })

    const isSafeModeNotificationDismissed = ref(false)
    const isDailyNotificationRequired = computed(() => {
      if (!shouldRemindDailyReward.value) return false
      if (isSafeModeNotificationDismissed.value) return false
      return isDailyRewardReady.value
    })

    return {
      shouldRemindDailyReward,
      lastRewardClaimTimestamp,
      isDailyRewardReady,
      isSafeModeNotificationDismissed,
      isDailyNotificationRequired,
    }
  },
  {
    persist: true,
  }
)
