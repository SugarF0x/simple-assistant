import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { MS_IN_DAY } from "@/consts"

const MIDDAY_OFFSET = MS_IN_DAY / 2

export const useMaholDailyStore = defineStore(
  "maholDaily",
  () => {
    const shouldRemindDailyReward = ref(false)

    const lastRewardClaimTimestamp = ref<string | null>(null)

    const isDailyRewardReady = computed(() => {
      if (!lastRewardClaimTimestamp.value) return false

      return (
        getLondonTime().valueOf() -
          MIDDAY_OFFSET -
          getTimeWithLondonOffset(new Date(lastRewardClaimTimestamp.value)).valueOf() >=
        MS_IN_DAY
      )
    })

    const isDailyNotificationRequired = computed(() => shouldRemindDailyReward.value && isDailyRewardReady.value)

    return {
      shouldRemindDailyReward,
      lastRewardClaimTimestamp,
      isDailyRewardReady,
      isDailyNotificationRequired,
    }
  },
  {
    persist: true,
  }
)

function getLondonTime(date?: Date) {
  return new Date((date?.valueOf() || Date.now()) + new Date().getTimezoneOffset() * 60 * 1000)
}

function getTimeWithLondonOffset(date?: Date) {
  const day = new Date(getLondonTime(date).valueOf() - MIDDAY_OFFSET)
  day.setHours(0, 0, 0, 0)
  return day
}
