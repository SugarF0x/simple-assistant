<script setup lang="ts">
import Task from "./Task.vue"
import Incomplete from "./Incomplete.vue"

import { onBeforeMount } from "vue"

onBeforeMount(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!ul) return

  ul.classList.add("modified-list-style")

  ul.innerHTML = ul.innerHTML.replaceAll("<li", "<button")
  ul.innerHTML = ul.innerHTML.replaceAll("</li", "</button")
  Array.from(ul.children).forEach((child) => {
    child.classList.add("button-text-left")
  })
})
</script>

<template>
  <Incomplete />
  <Task />
</template>

<style lang="scss">
.modified-list-style {
  display: flex;
  flex-flow: column;
}

.elevated-item {
  order: -1;
}

.button-text-left {
  text-align: left !important;
}
</style>
