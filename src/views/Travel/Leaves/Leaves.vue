<script setup lang="ts">
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { Checkbox } from "@/components"
import Leaf from "./Leaf.vue"
import { getTravelContainer } from "@/views/Travel/utils"

const { shouldDisplayLeaves } = storeToRefs(useTravelStore())

const leavesContainer = document.createElement("div")
leavesContainer.id = "sa-leaves-container"

const travelContainer = getTravelContainer()
const nativeWindow = travelContainer?.children[0] as HTMLDivElement

if (travelContainer) travelContainer.prepend(leavesContainer)
else console.error("No travel container found")

if (nativeWindow) nativeWindow.setAttribute("style", "z-index: 0;")
</script>

<template>
  <Checkbox v-model="shouldDisplayLeaves">
    <template #default> Bring the leaves back </template>
    <template #subtitle> Let there be fall! </template>
  </Checkbox>

  <Teleport v-if="shouldDisplayLeaves && travelContainer" :to="`#${leavesContainer.id}`">
    <Leaf v-for="n in 100" :key="n" />
  </Teleport>
</template>

<style lang="scss">
#complete-travel-container > div:nth-child(2) {
  display: grid;
  grid-template: "container";
  overflow: hidden;

  & > * {
    grid-area: container;

    &:nth-child(2) {
      align-items: unset;
    }
  }
}
</style>
