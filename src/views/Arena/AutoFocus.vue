<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"
import { useDialogObserver } from "@/hooks"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".col-span-2 button"))
const generateButton = buttons.find((b) => b.innerText.toLowerCase().includes("generate"))

useDialogObserver({
  toggle: shouldAutoFocusGenerate,
  onOpen: ({ el }) => {
    const button = el.querySelector<HTMLButtonElement>("button.w-full.justify-center.rounded-md")
    if (!button) return
    if (!["generate", "battle"].some((key) => button.innerText.toLowerCase().includes(key))) return

    const TRANSITION_TIMEOUT = 200
    setTimeout(() => {
      button.focus()
    }, TRANSITION_TIMEOUT)
  },
})

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
