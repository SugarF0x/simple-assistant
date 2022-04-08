<script setup lang="ts">
import { Checkbox } from "@/components"

import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted, ref, watch } from "vue"
import { TransitionPresets, useTransition } from "@vueuse/core"

const travelStore = useTravelStore()
const { cooldownTimeLeft, shouldPersistCooldown } = storeToRefs(travelStore)

/** Step Button controls */

const stepButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  (val) => {
    if (!shouldPersistCooldown.value) return
    if (!stepButton) return
    if (!val) return
    stepButton.disabled = true

    setTimeout(() => {
      stepButton.disabled = false
    }, val)
  },
  {
    immediate: true,
  }
)

/** Step Bar controls */

const stepBarContainer = document.querySelector<HTMLDivElement>("#travelBarContainer")
const stepBar = document.querySelector<HTMLDivElement>("#myBar")

const width = ref(0)
const output = useTransition(width, {
  duration: cooldownTimeLeft.value,
  transition: TransitionPresets.easeInOutCubic,
  onFinished() {
    if (!stepBarContainer) return
    if (!stepBar) return

    stepBarContainer.style.display = "none"
    setTimeout(() => {
      stepBar.style.width = "0%"
    })
  },
})

watch(output, (val) => {
  if (!stepBar) return
  stepBar.style.width = `${val.toFixed(2)}%`
})

onMounted(() => {
  if (!shouldPersistCooldown.value) return
  if (!stepBarContainer) return
  if (!stepBar) return
  if (!cooldownTimeLeft.value) return

  stepBarContainer.style.display = "inherit"
  width.value = 100
})
</script>

<template>
  <Checkbox v-model="shouldPersistCooldown">
    <template #default> Preserve step cooldown </template>
    <template #subtitle> Hold your horses no more </template>
  </Checkbox>
</template>
