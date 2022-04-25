<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useMaholMonthlyStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const monthlyStore = useMaholMonthlyStore()
const { shouldRemindMonthlyReward, lastRewardClaimTimestamp } = storeToRefs(monthlyStore)

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
</script>

<template>
  <Controls to=".max-w-7xl.mx-auto.text-center.py-12.px-4">
    <Checkbox v-model="shouldRemindMonthlyReward">
      <template #default> Remind about daily rewards </template>
      <template #subtitle> Miss them daily rewards never more </template>
    </Checkbox>
  </Controls>
</template>
