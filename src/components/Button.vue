<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <a v-if="href" :href="href || '/'">
    <button
      v-bind="$attrs"
      class="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 border border-transparent text-xs md:text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-500 dark:text-white dark:bg-green-500 dark:hover:bg-green-600"
    >
      <slot />
    </button>
  </a>

  <button
    v-else
    v-bind="$attrs"
    class="inline-flex items-center justify-center px-3 py-2 md:px-5 md:py-3 border border-transparent text-xs md:text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-500 dark:text-white dark:bg-green-500 dark:hover:bg-green-600"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  .dark & {
    background-color: black;
    border: 1px solid rgba(211, 211, 211, 0.5);

    &:hover {
      background-color: rgba(211, 211, 211, 0.1);
    }
  }
}

button:disabled {
  opacity: 0.4;
  background-color: gray;
}
</style>
