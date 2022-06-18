<script setup lang="ts">
import { AutoFocus } from "./AutoFocus"
import Task from "./Task.vue"

import { Controls } from "@/components"
import { onBeforeMount } from "vue"
import { wrapElement } from "@/utils"

onBeforeMount(() => {
  const performButton = document.querySelector<HTMLButtonElement>("#questButton")
  if (!performButton) return

  wrapElement(performButton, "questControls")
})
</script>

<template>
  <Controls to="#questControls">
    <AutoFocus />
    <Task />
  </Controls>
</template>
