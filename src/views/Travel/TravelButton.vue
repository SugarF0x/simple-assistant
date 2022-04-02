<script setup lang="ts">
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const travelStore = useTravelStore()
const { cooldownTimeLeft } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  () => {
    if (!travelButton) return
    if (!cooldownTimeLeft.value) return
    travelButton.disabled = true

    setTimeout(() => {
      travelButton.disabled = false
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
