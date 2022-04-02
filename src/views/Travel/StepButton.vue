<script setup lang="ts">
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const travelStore = useTravelStore()
const { cooldownTimeLeft } = storeToRefs(travelStore)

const stepButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  () => {
    if (!stepButton) return
    if (!cooldownTimeLeft.value) return
    stepButton.disabled = true

    setTimeout(() => {
      stepButton.disabled = false
    }, cooldownTimeLeft.value)
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <slot />
</template>
