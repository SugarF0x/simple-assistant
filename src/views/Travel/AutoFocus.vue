<script setup lang="ts">
import { Checkbox } from "@/components"

import { onMounted, watch } from "vue"
import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"

const travelStore = useTravelStore()
const { cooldownTimeLeft, shouldAutoFocusStep, shouldAutoFocusEncounters, lastStepResponse } = storeToRefs(travelStore)

/** Encounter auto focus */

watch(lastStepResponse, async (response) => {
  if (!response) return
  if (!shouldAutoFocusEncounters.value) return

  /** timeout to let native script hydrate dom */
  setTimeout(() => {
    if (response.step_type === "npc") {
      const attackAnchor = document.querySelector<HTMLAnchorElement>(".travel-text a")
      if (!attackAnchor) return

      const substituteButton = document.createElement("button")
      substituteButton.setAttribute("class", attackAnchor.getAttribute("class") || "")
      attackAnchor.removeAttribute("class")
      substituteButton.innerText = attackAnchor.innerText
      attackAnchor.innerText = ""
      attackAnchor.appendChild(substituteButton)
      substituteButton.focus()
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

watch(
  cooldownTimeLeft,
  (val) => {
    if (!shouldAutoFocusStep.value) return
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
  if (!shouldAutoFocusStep.value) return
  if (!travelButton) return
  travelButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusStep">
    <template #default> Autofocus step button </template>
    <template #subtitle> Just hit space! </template>
  </Checkbox>
  <Checkbox v-model="shouldAutoFocusEncounters">
    <template #default> Autofocus encounters </template>
    <template #subtitle> Hit space to attack/gather </template>
  </Checkbox>
</template>
