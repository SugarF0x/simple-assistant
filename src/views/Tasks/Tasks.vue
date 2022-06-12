<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { useParser } from "@/views/Tasks/hooks"

const tasksStore = useTasksStore()
const { shouldTrackTasks, shouldRemindToUpdateTasks, tasks, lastUpdateTimestamp } = storeToRefs(tasksStore)

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
    <Checkbox v-model="shouldRemindToUpdateTasks" :parent="shouldTrackTasks">
      <template #default> Remind to update tasks </template>
      <template #subtitle> Show daily notification to check on new tasks </template>
    </Checkbox>
  </Controls>
</template>

<style lang="scss" scoped>
.wrapper {
  color: white;
}
</style>
