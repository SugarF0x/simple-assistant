import { computed, ref } from "vue"

const MS_IN_DAY = 1000 * 60 * 60 * 24
const MIDDAY_OFFSET = MS_IN_DAY / 2

export function useDaily() {
  const shouldRemindDailyReward = ref(false)

  const lastRewardClaimTimestamp = ref<string | null>(null)

  const isRewardReady = computed(() => {
    if (!lastRewardClaimTimestamp.value) return true

    return (
      getLondonTime().valueOf() - getClaimTimeWithLondonOffset(new Date(lastRewardClaimTimestamp.value)).valueOf() >
      MS_IN_DAY
    )
  })

  const shouldShowNotification = computed(() => shouldRemindDailyReward.value && isRewardReady.value)

  return {
    shouldRemindDailyReward,
    lastRewardClaimTimestamp,
    isRewardReady,
    shouldShowNotification,
  }
}

function getLondonTime(date?: Date) {
  return new Date((date?.valueOf() || Date.now()) + new Date().getTimezoneOffset() * 60 * 1000)
}

function getClaimTimeWithLondonOffset(date?: Date) {
  const day = new Date(getLondonTime(date).valueOf() - MIDDAY_OFFSET)
  day.setHours(0, 0, 0, 0)
  return day
}
