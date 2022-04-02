<script setup lang="ts">
import SpecialAttackLock from "./SpecialAttackLock.vue"
</script>

<template>
  <Teleport to=".bg-white.mt-4.rounded-md.p-8.text-center">
    <div class="controls">
      <SpecialAttackLock />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.controls {
  margin-top: 1rem;
}
</style>
