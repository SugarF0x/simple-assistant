<script setup lang="ts">
import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { Checkbox } from "@/components"

import leaf1 from "@/assets/svgs/leaf-1.svg"
import leaf2 from "@/assets/svgs/leaf-2.svg"
import leaf3 from "@/assets/svgs/leaf-3.svg"
import leaf4 from "@/assets/svgs/leaf-4.svg"

const leaves = [leaf1, leaf2, leaf3, leaf4].map((e) => chrome.runtime.getURL(e))

const { shouldDisplayLeaves } = storeToRefs(useTravelStore())

const leavesContainer = document.createElement("div")
leavesContainer.id = "sa-leaves-container"

const travelContainer = Array.from(document.querySelectorAll("#complete-travel-container > div"))[1]
if (travelContainer) travelContainer.prepend(leavesContainer)
else console.error("No travel container found")
</script>

<template>
  <Checkbox v-model="shouldDisplayLeaves">
    <template #default> Bring the leaves back </template>
    <template #subtitle> Let there be fall! </template>
  </Checkbox>

  <Teleport v-if="shouldDisplayLeaves && travelContainer" :to="`#${leavesContainer.id}`">
    <img v-for="n in 24" :key="n" :src="leaves[n % leaves.length]" :alt="`leaf-${n}`" class="sa-leaf" />
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

#sa-leaves-container {
}

.sa-leaf {
  width: 24px;
  height: 24px;
}
</style>
