<script setup lang="ts">
import { Daily, SafeMode, Monthly } from "./Items"
</script>

<template>
  <Teleport to="main">
    <div class="notificationWrapper">
      <Daily />
      <Monthly />
      <SafeMode />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.notificationWrapper {
  position: fixed;
  top: 2rem;
  right: 2rem;

  display: flex;
  flex-flow: column;
  gap: 12px;

  z-index: 1000;
}
</style>
