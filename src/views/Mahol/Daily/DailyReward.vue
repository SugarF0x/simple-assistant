<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useMaholDailyStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { useSwalObserver } from "@/hooks"
import { createControlsSlot } from "@/utils"

const controlsAnchor = document.querySelector(".web-app-container div[style]")
createControlsSlot(controlsAnchor?.parentElement ?? null, "before")

const notificationStore = useMaholDailyStore()
const { shouldRemindDailyReward, lastRewardClaimTimestamp } = storeToRefs(notificationStore)

onMounted(() => {
  const claimButton = document.querySelector<HTMLButtonElement>(".mt-8.flex.justify-center button")
  if (!claimButton) return

  claimButton.addEventListener("click", () => {
    /** let native script hydrate dom */
    setTimeout(() => {
      const confirmButton = document.querySelector<HTMLButtonElement>(".swal2-actions button")
      if (!confirmButton) return

      confirmButton.addEventListener("click", () => {
        lastRewardClaimTimestamp.value = new Date().toISOString()
      })
    })
  })
})

useSwalObserver({
  onResolve: () => {
    lastRewardClaimTimestamp.value = new Date().toISOString()
  },
})
</script>

<template>
  <Controls>
    <Checkbox v-model="shouldRemindDailyReward">
      <template #default> Remind about daily rewards </template>
      <template #subtitle> Miss them daily rewards never more </template>
    </Checkbox>
  </Controls>
</template>
