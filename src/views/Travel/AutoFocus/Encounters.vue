<script setup lang="ts">
import { Checkbox } from "@/components"
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const travelStore = useTravelStore()
const { shouldAutoFocusEncounters, lastStepResponse } = storeToRefs(travelStore)

watch(lastStepResponse, (response) => {
  if (!response) return
  if (!shouldAutoFocusEncounters.value) return

  /** timeout to let native script hydrate dom */
  setTimeout(() => {
    if (response.step_type === "npc") {
      const attackAnchor = document.querySelector<HTMLAnchorElement>("div:has(>.travel-text) a")
      console.log({ attackAnchor })
      if (!attackAnchor) return

      wrapAnchorWithButton(attackAnchor).focus()
    }

    if (response.step_type === "material") {
      const collectButton = document.querySelector<HTMLButtonElement>("div:has(>.travel-text) button")
      if (!collectButton) return
      collectButton.focus()
    }
  }, 510)
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusEncounters">
    <template #default> Autofocus encounters </template>
    <template #subtitle> Hit space/enter to attack/gather </template>
  </Checkbox>
</template>
