<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".col-span-2 button"))
const generateButton = buttons.find((b) => b.innerText.toLowerCase().includes("generate"))

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
