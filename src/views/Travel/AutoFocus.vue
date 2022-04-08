<script setup lang="ts">
import { Checkbox } from "@/components"

import { watch } from "vue"
import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable, wrapAnchorWithButton } from "@/utils"

const travelStore = useTravelStore()
const { shouldAutoFocusStep, shouldAutoFocusEncounters, lastStepResponse } = storeToRefs(travelStore)

/** Encounter auto focus */

watch(lastStepResponse, async (response) => {
  if (!response) return
  if (!shouldAutoFocusEncounters.value) return

  /** timeout to let native script hydrate dom */
  setTimeout(() => {
    if (response.step_type === "npc") {
      const attackAnchor = document.querySelector<HTMLAnchorElement>(".travel-text a")
      if (!attackAnchor) return

      wrapAnchorWithButton(attackAnchor).focus()
    }

    if (response.step_type === "material") {
      const collectButton = document.querySelector<HTMLButtonElement>(".travel-text button")
      if (!collectButton) return
      collectButton.focus()
    }
  })
})

/** Travel button auto focus */

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")
const observer = travelButton && focusOnButtonEnable(travelButton)

watch(
  shouldAutoFocusStep,
  (val) => {
    if (!observer) return

    if (val) observer.connect()
    else observer.disconnect()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusStep">
    <template #default> Autofocus step button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
  <Checkbox v-model="shouldAutoFocusEncounters">
    <template #default> Autofocus encounters </template>
    <template #subtitle> Hit space/enter to attack/gather </template>
  </Checkbox>
</template>
