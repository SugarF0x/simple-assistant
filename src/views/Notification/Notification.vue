<script setup lang="ts">
import { Daily, SafeMode, Monthly, Tasks, NewBosses } from "./Items"
</script>

<template>
  <Teleport to="main">
    <div class="notificationWrapper">
      <Daily />
      <Monthly />
      <SafeMode />
      <Tasks />
      <NewBosses />
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
