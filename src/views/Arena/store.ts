import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { addHours, isAfter, nextMonday, subHours } from "date-fns"
import { getTimeWithLondonOffset } from "@/utils"

export const useArenaStore = defineStore(
  "arena",
  () => {
    const shouldAutoFocusGenerate = ref(false)
    const shouldTrackBosses = ref(false)
    const shouldNotifyOfBosses = ref(false)

    const bossList = ref<Boss[]>([])
    const snapshotTimestamp = ref<string | null>(null)
    const refreshTimestamp = computed(() => {
      if (!snapshotTimestamp.value) return null
      const londonSnapshotTime = getTimeWithLondonOffset(subHours(new Date(snapshotTimestamp.value), 12))
      return new Date(
        addHours(nextMonday(londonSnapshotTime), 12).valueOf() - new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()
    })

    const areNewBossesAvailable = computed(
      () => !bossList.value.length && refreshTimestamp.value && isAfter(new Date(), new Date(refreshTimestamp.value))
    )

    return {
      shouldAutoFocusGenerate,
      shouldTrackBosses,
      shouldNotifyOfBosses,
      bossList,
      snapshotTimestamp,
      refreshTimestamp,
      areNewBossesAvailable,
    }
  },
  {
    persist: true,
  }
)

export interface Boss {
  name: string
  level: number
  timestamp: string
  href: string
  img: string
}
