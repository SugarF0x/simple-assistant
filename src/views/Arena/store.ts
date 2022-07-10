import { defineStore } from "pinia"
import { computed, ref, watchEffect } from "vue"
import { addHours, addMinutes, isAfter, isBefore, isWithinInterval, nextMonday, subHours } from "date-fns"
import { getTimeWithLondonOffset } from "@/utils"
import { sendBossNotificationMessage } from "~/notifications/utils"

export const useArenaStore = defineStore(
  "arena",
  () => {
    const shouldAutoFocusGenerate = ref(false)
    const shouldTrackBosses = ref(false)
    const shouldNotifyOfBosses = ref(false)

    const bossList = ref<Boss[]>([])
    const attackableBosses = computed(() =>
      bossList.value.filter((entry) =>
        isWithinInterval(new Date(), {
          start: new Date(entry.timestamp),
          end: addMinutes(new Date(entry.timestamp), 15),
        })
      )
    )

    const snapshotTimestamp = ref<string | null>(null)
    const refreshTimestamp = computed(() => {
      if (!snapshotTimestamp.value) return null
      const londonSnapshotTime = getTimeWithLondonOffset(subHours(new Date(snapshotTimestamp.value), 12))
      return new Date(
        addHours(nextMonday(londonSnapshotTime), 12).valueOf() - new Date().getTimezoneOffset() * 60 * 1000
      ).toISOString()
    })
    const areNewBossesAvailable = computed(
      () =>
        !bossList.value.length &&
        refreshTimestamp.value &&
        isAfter(new Date(), new Date(refreshTimestamp.value)) &&
        snapshotTimestamp.value &&
        isBefore(new Date(snapshotTimestamp.value), new Date(refreshTimestamp.value))
    )

    watchEffect(() => {
      if (!bossList.value.length) return
      sendBossNotificationMessage(bossList.value, shouldNotifyOfBosses.value)
    })

    return {
      shouldAutoFocusGenerate,
      shouldTrackBosses,
      shouldNotifyOfBosses,
      bossList,
      attackableBosses,
      snapshotTimestamp,
      refreshTimestamp,
      areNewBossesAvailable,
    }
  },
  {
    persist: {
      serializer: {
        deserialize: (store) => {
          const parsed = JSON.parse(store)
          const bossList: Boss[] = parsed.bossList
          parsed.bossList = bossList.filter(
            (entry) => !entry.isDead && isBefore(new Date(), addMinutes(new Date(entry.timestamp), 15))
          )
          return parsed
        },
        serialize: JSON.stringify,
      },
    },
  }
)

export interface Boss {
  name: string
  id: number
  level: number
  timestamp: string
  href: string
  img: string
  isDead: boolean
}
