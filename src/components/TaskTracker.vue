<script setup lang="ts">
import { Task, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, toRefs } from "vue"

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const props = defineProps<{
  task: Task
}>()
const { task } = toRefs(props)

const progressText = computed(() => {
  if (task.value.progress < task.value.requirement) return `${task.value.progress}/${task.value.requirement}`
  return "done"
})
</script>

<template>
  <div class="task-tracker">
    <template v-if="task">
      <img :src="task.icon" alt="step_icon" />
      <span class="title">{{ task.title }}</span>
      <span class="progress" :class="{ completed: task.progress >= task.requirement }"> [{{ progressText }}] </span>
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
  justify-content: flex-end;
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
