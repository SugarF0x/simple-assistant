<script setup lang="ts">
import TravelBridge from "./TravelBridge.vue"
import TravelBar from "./TravelBar.vue"
import TravelButton from "./TravelButton.vue"
import AutoFocus from "./AutoFocus.vue"
</script>

<template>
  <Teleport to=".px-4.py-4.text-center">
    <div class="controls">
      <TravelBridge />
      <TravelBar />
      <TravelButton />
      <AutoFocus />
    </div>
  </Teleport>
</template>

<style lang="scss">
.controls {
  margin-top: 1rem;
}
</style>
