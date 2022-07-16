<script setup lang="ts">
import Autofocus from "./Autofocus.vue"
import Task from "./Task.vue"
import { Controls } from "@/components"
import { onBeforeMount } from "vue"
import { marketControlsId } from "./ids"

onBeforeMount(() => {
  const navBar = document.querySelector("nav.flex.mb-8")
  if (!navBar) throw new Error("No nav bar found, nowhere to mount Market controls on")

  const controlsContainer = document.createElement("div")
  controlsContainer.id = marketControlsId
  controlsContainer.setAttribute("style", "position: relative;")

  navBar.insertAdjacentElement("afterend", controlsContainer)
})
</script>

<template>
  <Controls :to="`#${marketControlsId}`">
    <Autofocus />
    <Task />
  </Controls>
</template>
