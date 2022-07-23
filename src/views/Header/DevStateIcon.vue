<!--suppress HtmlUnknownTarget -->
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue"

const isDev = document.body.classList.contains("sa-dev-mode")
const isSocketConnected = ref(false)

const imgProps = computed<{ src: string; alt: string; title: string }>(() => {
  if (!isDev) {
    return {
      src: "/img/icons/icons8-sheep-32.png",
      alt: "simple_assistant_stable_build",
      title: "Stable build",
    }
  }

  if (isSocketConnected.value) {
    return {
      src: "/img/icons/S_Buff11.png",
      alt: "socket_connected",
      title: "Dev build (Hot Reload server connected)",
    }
  }

  return {
    src: "/img/icons/S_Buff04.png",
    alt: "socket_disconnected",
    title: "Dev build (Hot Reload server disconnected)",
  }
})

onBeforeMount(() => {
  if (!isDev) return

  setTimeout(() => {
    isSocketConnected.value = document.body.classList.contains("sa-ws-connected")
  }, 100)

  setInterval(() => {
    isSocketConnected.value = document.body.classList.contains("sa-ws-connected")
  }, 1000)
})
</script>

<template>
  <div class="wrapper">
    <img v-bind="imgProps" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
