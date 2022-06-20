<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

const generateButton = document.querySelector<HTMLButtonElement>(
  ".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.text-center button"
)

watchEffect(() => {
  if (!generateButton) return
  if (!shouldAutoFocusGenerate.value) return

  generateButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGenerate">
    <template #default> Autofocus generate button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>

<style lang="scss" scoped></style>
