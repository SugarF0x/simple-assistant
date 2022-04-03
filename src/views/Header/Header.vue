<script setup lang="ts">
import { Controls } from "@/components"

const version = chrome.runtime.getManifest().version
</script>

<template>
  <Controls to=".px-4.text-center">
    <h2>Simple assistant v{{ version }}</h2>
  </Controls>
</template>

<style lang="scss" scoped></style>
