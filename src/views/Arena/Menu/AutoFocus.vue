<script setup lang="ts">
import { Checkbox } from "@/components"

import { useArenaStore } from "../store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const arenaStore = useArenaStore()
const { shouldAutoFocusGenerate } = storeToRefs(arenaStore)

const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".col-span-4 a"))
const buttons = anchors.map(wrapAnchorWithButton)
const generateButton = buttons.find((b) => b.innerText.toLowerCase().includes("npc"))

watchEffect(() => {
  if (!generateButton) return
  if (!shouldAutoFocusGenerate.value) return

  generateButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGenerate">
    <template #default> Autofocus battle NPC button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
