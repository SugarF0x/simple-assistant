<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { useParser } from "@/views/Tasks/hooks"

const tasksStore = useTasksStore()
const { shouldTrackTasks, shouldShowReminders, tasks, lastUpdateTimestamp } = storeToRefs(tasksStore)

onMounted(() => {
  tasks.value = useParser()
  lastUpdateTimestamp.value = new Date().toISOString()
})
</script>

<template>
  <Controls to=".backdrop-blur-md" class="wrapper">
    <Checkbox v-model="shouldTrackTasks">
      <template #default> Track tasks </template>
      <template #subtitle> Help tracking step, kill & quest completion progress </template>
    </Checkbox>
    <Checkbox v-model="shouldShowReminders" :parent="shouldTrackTasks">
      <template #default> Show notifications </template>
      <template #subtitle> Remind you to update tasks & collect rewards </template>
      <template #requires> Requires task tracking to be enabled </template>
    </Checkbox>
  </Controls>
</template>

<style lang="scss" scoped>
.wrapper {
  color: white;
}
</style>
