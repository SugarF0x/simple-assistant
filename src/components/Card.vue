<script setup lang="ts">
defineProps<{
  shadow?: boolean
  outline?: boolean
}>()
</script>

<template>
  <div class="cardWrapper" :class="{ shadow, outline }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cardWrapper {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;

  -webkit-box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);
  box-shadow: 0 0 1px 0 rgba(50, 50, 50, 0.5);

  .dark & {
    background-color: black;
    color: white;

    -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  }
}

.shadow {
  -webkit-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);

  .dark & {
    -webkit-box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.75);
  }
}

.outline {
  border: 1px solid rgba(0, 0, 0, 0.5);

  .dark & {
    border: 1px solid rgba(211, 211, 211, 0.05);
  }
}
</style>
