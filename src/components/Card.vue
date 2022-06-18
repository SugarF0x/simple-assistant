<script setup lang="ts">
defineProps<{
  shadow?: boolean
}>()
</script>

<template>
  <div class="cardWrapper" :class="{ shadow }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cardWrapper {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: min(80vw, 365px);

  -webkit-box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);
  box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);
}

.shadow {
  -webkit-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
}
</style>
