<script setup lang="ts">
import Autofocus from "./Autofocus.vue"
import { Controls } from "@/components"
import { onBeforeMount } from "vue"

const marketControlsId = "marketControls"

onBeforeMount(() => {
  const navBar = document.querySelector("nav.flex.mb-8")
  if (!navBar) throw new Error("No nav bar found, nowhere to mount Market controls on")

  const controlsContainer = document.createElement("div")
  controlsContainer.id = marketControlsId

  navBar.insertAdjacentElement("afterend", controlsContainer)
})
</script>

<template>
  <Controls :to="`#${marketControlsId}`">
    <Autofocus />
  </Controls>
</template>
