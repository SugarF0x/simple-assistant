<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "../store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

onMounted(() => {
  if (!shouldAutoFocusGenerate.value) return

  const generateButton = document.querySelector<HTMLButtonElement>(".backdrop-blur-md button")
  if (!generateButton) return

  generateButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGenerate">
    <template #default> Autofocus generate button* </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
