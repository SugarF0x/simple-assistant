<script setup lang="ts">
import Task from "./Task.vue"
import Incomplete from "./Incomplete.vue"
import { getQuestListElement } from "../helpers"

const listElement = getQuestListElement()
listElement.classList.add('modified-list-style')
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
</style>
