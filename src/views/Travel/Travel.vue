<script setup lang="ts">
import { Controls } from "@/components"

import TravelBridge from "./TravelBridge.vue"
import TravelBar from "./TravelBar.vue"
import StepButton from "./StepButton.vue"
import AutoFocus from "./AutoFocus.vue"
</script>

<template>
  <Controls to=".px-4.py-4.text-center">
    <TravelBridge />
    <TravelBar />
    <StepButton />
    <AutoFocus />
  </Controls>
</template>
