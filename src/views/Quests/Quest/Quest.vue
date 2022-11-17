<script setup lang="ts">
import { AutoFocus } from "./AutoFocus"
import Task from "./Task.vue"
import { Controls, Card } from "@/components"
import { createControlsSlot } from "@/utils"

const controlsAnchor = document.querySelector(".web-app-container > div > div")
createControlsSlot(controlsAnchor)
</script>

<template>
  <Controls>
    <Card>
      <AutoFocus />
      <Task />
    </Card>
  </Controls>
</template>
