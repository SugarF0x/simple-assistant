<script setup lang="ts">
import { Checkbox, TaskTracker } from "@/components"
import { TaskType, useTasksStore } from "@/views/Tasks/store"
import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { computed, watch } from "vue"
import { getTravelContainer } from "@/views/Travel/utils"

const travelStore = useTravelStore()
const { shouldHelpTrackStepsTaskProgress, lastStepResponse } = storeToRefs(travelStore)

const taskStore = useTasksStore()
const { advanceTask } = taskStore
const { allTasks, shouldTrackTasks } = storeToRefs(taskStore)
const tasks = computed(() => allTasks.value.filter((entry) => entry.type === TaskType.STEP))

const shouldShowHUD = computed(() => shouldTrackTasks.value && shouldHelpTrackStepsTaskProgress.value)

watch(lastStepResponse, (response) => {
  if (!shouldTrackTasks.value) return
  if (!shouldHelpTrackStepsTaskProgress.value) return
  if (!response) return
  if (!response.step_type) return

  for (const task of tasks.value) {
    advanceTask(task)
  }
})

const tasksOverlayElement = document.createElement('div')
const tasksOverlayId = 'sa-tasks-overlay'
tasksOverlayElement.id = tasksOverlayId

const travelContainer = getTravelContainer()
travelContainer.append(tasksOverlayElement)
</script>

<template>
  <Checkbox
    v-model="shouldHelpTrackStepsTaskProgress"
    :parent="shouldTrackTasks"
    @enable-required="shouldTrackTasks = true"
  >
    <template #default> Help track steps task progress </template>
    <template #subtitle> See just how many steps you need </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <Teleport v-if="shouldShowHUD" :to="`#${tasksOverlayId}`">
    <div class="travel-tasks">
      <TaskTracker v-for="task in tasks" :key="task.title" :task="task" />
    </div>
  </Teleport>
</template>

<style lang="scss">
.travel-tasks {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

#sa-tasks-overlay {
  position: absolute;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  pointer-events: none;
}
</style>
