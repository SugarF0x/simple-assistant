<script setup lang="ts">
defineProps<{
  to: string
}>()
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
