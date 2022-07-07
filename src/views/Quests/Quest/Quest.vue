<script setup lang="ts">
import { AutoFocus } from "./AutoFocus"
import Task from "./Task.vue"

import { Controls } from "@/components"
import { onBeforeMount } from "vue"
import { wrapElement } from "@/utils"
import { getPerformButton } from "./utils"

const performButton = getPerformButton()

onBeforeMount(() => {
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
