<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "../store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

const generateButton = document.querySelector<HTMLButtonElement>(".backdrop-blur-md button")
watch(
  shouldAutoFocusGenerate,
  (val) => {
    if (!generateButton) return
    if (!val) return
    generateButton.focus()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGenerate">
    <template #default> Autofocus generate button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
