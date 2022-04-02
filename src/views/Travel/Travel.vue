<script setup lang="ts">
import TravelBridge from "./TravelBridge.vue"
import TravelBar from "./TravelBar.vue"

import { useTravelButton } from "./useTravelButton"

useTravelButton()
</script>

<template>
  <TravelBridge />
  <TravelBar />
</template>
