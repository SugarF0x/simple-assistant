<script setup lang="ts">
import { onMounted, watch } from "vue"
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"

const travelStore = useTravelStore()
const { cooldownTimeLeft } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  (val) => {
    if (!val) return
    if (!travelButton) return

    setTimeout(() => {
      travelButton.focus()
    }, val + 10)
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  if (!travelButton) return
  travelButton.focus()
})
</script>

<template>
  <slot></slot>
</template>
