<script setup lang="ts">
import { defineProps } from "vue"

defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Teleport :to="to">
    <div class="controls" :class="$attrs.class" :style="$attrs.style">
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.controls {
  margin-top: 1rem;
}
</style>
