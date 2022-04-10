<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useNotificationStore } from "@/views/Notification/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const notificationStore = useNotificationStore()
const { shouldRemindDailyReward, lastRewardClaimTimestamp } = storeToRefs(notificationStore)

onMounted(() => {
  // TODO: fix this - the button does not exist until you press Claim

  const button = document.querySelector<HTMLButtonElement>(".swal2-actions button")
  if (!button) return

  button.addEventListener("click", () => {
    lastRewardClaimTimestamp.value = new Date().toISOString()
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
