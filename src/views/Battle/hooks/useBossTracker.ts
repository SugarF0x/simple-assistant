import { storeToRefs } from "pinia"
import { useArenaStore } from "../../Arena/store"
import { watchEffect } from "vue"
import { useRoute } from "vue-router"

export function useBossTracker() {
  const route = useRoute()
  const { bossList, shouldNotifyOfBosses } = storeToRefs(useArenaStore())

  watchEffect(() => {
    if (!shouldNotifyOfBosses.value) return
    if (!route.query["sa-notified"]) return

    const id = Number(route.params.id as string)
    const matchedBoss = bossList.value.find((boss) => boss.id === id)
    if (!matchedBoss) return

    matchedBoss.isDead = true
  })
}
