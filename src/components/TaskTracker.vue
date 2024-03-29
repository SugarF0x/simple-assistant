<script setup lang="ts">
import { Task, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, toRefs } from "vue"
import TaskCategory from './TaskCategory.vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const props = defineProps<{
  task: Task
  stack?: boolean
  color?: string
}>()
const { task } = toRefs(props)

const progressText = computed(() => {
  if (task.value.progress < task.value.requirement) return `${task.value.progress}/${task.value.requirement}`
  return "done"
})
</script>

<template>
  <div v-if="stack" class="stack" :class="{ 'color-override': color }">
    <div class="title">{{ task.title }}</div>
    <div>
      <TaskCategory :category="task.category" />
      <img :src="task.icon" alt="step_icon" />
      <span class="progress" :class="{ completed: task.progress >= task.requirement }"> [{{ progressText }}] </span>
    </div>
  </div>

  <div v-else class="task-tracker" :class="{ 'color-override': color }">
    <template v-if="task">
      <TaskCategory :category="task.category" />
      <img :src="task.icon" alt="step_icon" />
      <span class="title">{{ task.title }}</span>
      <span class="progress" :class="{ completed: task.progress >= task.requirement }"> [{{ progressText }}] </span>
    </template>

    <template v-else>
      <span class="title"> No today tasks tracked. Please, visit Tasks page. </span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.color-override {
  * {
    color: v-bind(color) !important;
  }
}

.task-tracker {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    margin-left: .5rem;
  }
}

.title {
  margin-left: 0.5rem;

  .stack & {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }

  .dark & {
    color: white;
  }
}

.progress {
  margin-left: 0.25rem;
  opacity: 0.8;

  .dark & {
    color: white;
  }

  &.completed {
    color: lime !important;
    opacity: 1;
  }
}
</style>
