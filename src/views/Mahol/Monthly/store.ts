import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { addMonths, getDate, isAfter, setDate, startOfDay } from "date-fns"
import { MS_IN_DAY } from "@/consts"
import { getLondonTime } from "@/utils"

export const useMaholMonthlyStore = defineStore(
  "maholMonthly",
  () => {
    const shouldRemindMonthlyReward = ref(false)

    const lastRewardClaimTimestamp = ref(new Date().toISOString())

    const isMonthlyRewardReady = computed(() => {
      const lastClaimDate = startOfDay(new Date(new Date(lastRewardClaimTimestamp.value).valueOf() - MS_IN_DAY / 2))

      const nextClaimDate = (() => {
        const claimDay = getDate(lastClaimDate)
        if (claimDay < 28) return setDate(lastClaimDate, 28)
        return addMonths(setDate(lastClaimDate, 28), 1)
      })()

      return isAfter(getLondonTime().valueOf() - MS_IN_DAY / 2, nextClaimDate)
    })

    return {
      shouldRemindMonthlyReward,
      lastRewardClaimTimestamp,
      isMonthlyRewardReady,
    }
  },
  {
    persist: true,
  }
)
