<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useMaholDailyStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const notificationStore = useMaholDailyStore()
const { shouldRemindDailyReward, lastRewardClaimTimestamp, isSafeModeNotificationDismissed } =
  storeToRefs(notificationStore)

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
        isSafeModeNotificationDismissed.value = false
      })
    })
  })
})
</script>

<template>
  <Controls to=".max-w-7xl.mx-auto.text-center.py-12.px-4">
    <Checkbox v-model="shouldRemindDailyReward">
      <template #default> Remind about daily rewards </template>
      <template #subtitle> Miss them daily rewards never more </template>
    </Checkbox>
  </Controls>
</template>
