<script setup lang="ts">
import { Controls } from "@/components"

import DataBridge from "./DataBridge.vue"
import StepButton from "./StepButton.vue"
import AutoFocus from "./AutoFocus.vue"
</script>

<template>
  <Controls to=".px-4.py-4.text-center">
    <DataBridge />
    <StepButton />
    <AutoFocus />
  </Controls>
</template>
