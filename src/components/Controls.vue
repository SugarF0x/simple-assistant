<script setup lang="ts">
import { SA_CONTROLS_ID } from "@/utils"

withDefaults(
  defineProps<{
    to?: string
  }>(),
  {
    to: `#${SA_CONTROLS_ID}`,
  }
)
</script>

<template>
  <Teleport :to="to">
    <div class="controls" v-bind="$attrs">
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.controls {
  margin: 1rem 0;
}
</style>
