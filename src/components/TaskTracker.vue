<script setup lang="ts">
import { Task, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="task-tracker">
    <template v-if="task">
      <img :src="task.icon" alt="step_icon" />
      <span class="title">{{ task.title }}</span>
      <span class="progress" :class="{ completed: task.progress >= task.requirement }"
        >[{{ task.progress }}/{{ task.requirement }}]</span
      >
    </template>

    <template v-else-if="tasks.length">
      <span class="title"> No task of this type today! </span>
    </template>

    <template v-else>
      <span class="title"> No today tasks tracked. Please, visit Tasks page. </span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.task-tracker {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 0.5rem;
}

.progress {
  margin-left: 0.25rem;
  color: lightgray;
}

.completed {
  color: lightgreen;
}
</style>
