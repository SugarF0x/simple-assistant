<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"

const tasksStore = useTasksStore()
const { shouldTrackTasks } = storeToRefs(tasksStore)
</script>

<template>
  <Controls to=".backdrop-blur-md" class="wrapper">
    <Checkbox v-model="shouldTrackTasks">
      <template #default> Track tasks </template>
      <template #subtitle> Help tracking step, kill & quest completion progress </template>
    </Checkbox>
  </Controls>
</template>

<style lang="scss" scoped>
.wrapper {
  color: white;
}
</style>
