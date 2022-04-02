<script setup lang="ts">
import { Checkbox } from "@/components"

import { onMounted, watch } from "vue"
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"

const travelStore = useTravelStore()
const { cooldownTimeLeft, shouldAutoFocus } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  (val) => {
    if (!shouldAutoFocus.value) return
    if (!val) return
    if (!travelButton) return

    setTimeout(() => {
      travelButton.focus()
    }, val)
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  if (!shouldAutoFocus.value) return
  if (!travelButton) return
  travelButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocus"> Autofocus step button </Checkbox>
</template>
