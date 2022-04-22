<script setup lang="ts">
import { Controls } from "@/components"

import DataBridge from "./DataBridge.vue"
import StepButton from "./StepButton.vue"
import { AutoFocus } from "./AutoFocus"
</script>

<template>
  <Controls to="#complete-travel-container">
    <DataBridge />
    <StepButton />
    <AutoFocus />
  </Controls>
</template>
