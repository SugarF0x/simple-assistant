<script setup lang="ts">
import { ExpandedDetails } from "./ExpandedDetails"
import Task from "./Task.vue"

import { Controls } from "@/components"
import { onBeforeMount } from "vue"

onBeforeMount(() => {
  const mainWrapper = document.querySelector<HTMLDivElement>(".web-app-container")
  if (!mainWrapper) return

  const controlsContainer = document.createElement("div")
  controlsContainer.id = "controlsContainer"

  mainWrapper.prepend(controlsContainer)
})
</script>

<template>
  <Controls to="#controlsContainer">
    <ExpandedDetails />
    <Task />
  </Controls>
</template>
