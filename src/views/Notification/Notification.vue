<script setup lang="ts">
import { Daily } from "./Items"

import { useNotificationStore } from "./store"
import { storeToRefs } from "pinia"

const notificationStore = useNotificationStore()
const { shouldShowDailyNotification } = storeToRefs(notificationStore)
</script>

<template>
  <Teleport to="main">
    <div class="notificationWrapper">
      <Daily v-if="shouldShowDailyNotification" />
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
  gap: 8px;

  z-index: 1000;
}

.item {
  & + & {
    margin-top: 1rem;
  }
}
</style>
