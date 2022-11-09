<script setup lang="ts">
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { Checkbox } from "@/components"
import Leaf from "./Leaf.vue"

const { shouldDisplayLeaves } = storeToRefs(useTravelStore())

const leavesContainer = document.createElement("div")
leavesContainer.id = "sa-leaves-container"

const travelContainer = Array.from(document.querySelectorAll("#complete-travel-container > div"))[1]
const nativeWindow = travelContainer?.children[0] as HTMLDivElement

if (travelContainer) travelContainer.prepend(leavesContainer)
else console.error("No travel container found")

if (nativeWindow) nativeWindow.setAttribute("style", "z-index: 999;")
</script>

<template>
  <Checkbox v-model="shouldDisplayLeaves">
    <template #default> Bring the leaves back </template>
    <template #subtitle> Let there be fall! </template>
  </Checkbox>

  <Teleport v-if="shouldDisplayLeaves && travelContainer" :to="`#${leavesContainer.id}`">
    <Leaf v-for="n in 37" :key="n" />
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
