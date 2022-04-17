<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useSafeModeStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const safeModeStore = useSafeModeStore()
const { shouldRemindSafeMode, lastSafeModeActivationTime, isSafeModeNotificationDismissed } = storeToRefs(safeModeStore)

onMounted(() => {
  const enableButton = document.querySelector<HTMLButtonElement>(
    ".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.mt-4 button"
  )
  if (!enableButton) return

  enableButton.addEventListener("click", () => {
    /** let native script hydrate dom */
    setTimeout(() => {
      const confirmButton = document.querySelector<HTMLButtonElement>(".swal2-actions button")
      if (!confirmButton) return

      confirmButton.addEventListener("click", () => {
        lastSafeModeActivationTime.value = new Date().toISOString()
        isSafeModeNotificationDismissed.value = false
      })
    })
  })
})
</script>

<template>
  <Controls to=".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.mt-4">
    <Checkbox v-model="shouldRemindSafeMode">
      <template #default> Remind to enable safe mode </template>
      <template #subtitle>
        Currently only works for 24h safe modes
        <br />
        Since i am no pleb, i cant do it for the extended functionality
      </template>
    </Checkbox>
  </Controls>
</template>