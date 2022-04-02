<script setup lang="ts">
import { useTravelButton } from "./useTravelButton"
import { useTravelBar } from "./useTravelBar"
import TravelBridge from "./TravelBridge.vue"

useTravelButton()
useTravelBar()
</script>

<template>
  <TravelBridge />
</template>
