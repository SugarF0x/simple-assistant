<script setup lang="ts">
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const travelStore = useTravelStore()
const { cooldownTimeLeft } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

// TODO: have this fire in watch mode since sometimes natve disable attr removal fires later than it should
onMounted(() => {
  if (!travelButton) return
  if (!cooldownTimeLeft.value) return
  travelButton.disabled = true

  setTimeout(() => {
    travelButton.disabled = false
  }, cooldownTimeLeft.value)
})
</script>

<template>
  <slot />
</template>
