<!--suppress HtmlUnknownTarget -->
<script setup lang="ts">
import { onBeforeMount, ref } from "vue"

const isDev = document.body.classList.contains("sa-dev-mode")
const isSocketConnected = ref(false)

onBeforeMount(() => {
  if (!isDev) return

  setTimeout(() => {
    isSocketConnected.value = document.body.classList.contains("sa-ws-connected")
  }, 50)

  setInterval(() => {
    isSocketConnected.value = document.body.classList.contains("sa-ws-connected")
  }, 1000)
})
</script>

<template>
  <template v-if="isDev">
    <div class="wrapper">
      <img v-if="isSocketConnected" src="/img/icons/S_Buff11.png" alt="socket_connected" title="Hot Reload enabled" />
      <img v-else src="/img/icons/S_Buff04.png" alt="socket_disconnected" title="Hot Reload disabled" />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
