<script setup lang="ts">
import Details from "./DestinationDetails.vue"

import { Checkbox } from "@/components"
import { useCarriageStore } from "../store"
import { storeToRefs } from "pinia"
import { useData } from "./useData"
import { computed, watchEffect } from "vue"

const carriageStore = useCarriageStore()
const { shouldShowTravelDestinationDetails, shouldHighlightBestStats } = storeToRefs(carriageStore)

const { destinations, bestValueLocations } = useData()

const shouldRenderDetails = computed(() => !!destinations.value && shouldShowTravelDestinationDetails.value)

function insertAfter(newNode: HTMLElement, referenceNode: HTMLElement) {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling)
}

/** add teleport ids */
watchEffect(() => {
  if (!destinations.value) return

  for (const entry of destinations.value) {
    const [card, data] = entry
    if (!data) continue

    const buttonWrapper = card.querySelector<HTMLDivElement>(".my-4")
    if (!buttonWrapper) continue

    const teleportTarget = document.createElement("div")
    teleportTarget.id = `details-${data.name}`
    insertAfter(teleportTarget, buttonWrapper)
  }
})

watchEffect(() => {
  if (!destinations.value) return

  for (const entry of destinations.value) {
    const [card, data] = entry
    if (!data) continue

    const buttonWrapper = card.querySelector(".my-4")
    if (!buttonWrapper) return

    if (shouldShowTravelDestinationDetails.value) buttonWrapper.setAttribute("style", "display: none;")
    else buttonWrapper.removeAttribute("style")
  }
})
</script>

<template>
  <Checkbox v-model="shouldShowTravelDestinationDetails">
    <template #default> Show travel destination details </template>
    <template #subtitle> See your chances up front </template>
  </Checkbox>
  <Checkbox v-model="shouldHighlightBestStats" :parent="shouldShowTravelDestinationDetails">
    <template #default> Highlight best chances </template>
    <template #subtitle> Green is the best you have </template>
    <template #requires> Requires travel destination details enabled </template>
  </Checkbox>

  <template v-if="shouldRenderDetails">
    <Teleport v-for="([, data], index) of destinations" :key="index" :to="`#details-${data.name}`">
      <Details
        :materials="data.materials"
        :modifiers="data.modifiers"
        :highlight="shouldHighlightBestStats"
        :bests="bestValueLocations[data.name]"
      />
    </Teleport>
  </template>
</template>
