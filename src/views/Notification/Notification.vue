<script setup lang="ts">
import { Daily, SafeMode } from "./Items"

import { useNotificationStore } from "./store"
import { storeToRefs } from "pinia"

const notificationStore = useNotificationStore()
const { isDailyNotificationRequired, isSafeModeNotificationRequired } = storeToRefs(notificationStore)
</script>

<template>
  <Teleport to="main">
    <div class="notificationWrapper">
      <Daily v-if="isDailyNotificationRequired" />
      <SafeMode v-if="isSafeModeNotificationRequired" />
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
