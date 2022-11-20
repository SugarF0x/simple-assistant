<script setup lang="ts">
import { Checkbox, TaskTracker } from "@/components"
import { useMarketStore } from "./store"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useSwalObserver } from "@/hooks"
import { marketControlsId } from "./ids"
import { TaskType, useTasksStore } from "../Tasks/store"

const { shouldTrackPurchaseTask } = storeToRefs(useMarketStore())
const tasksStore = useTasksStore()
const { advanceTask } = tasksStore
const { allTasks } = storeToRefs(tasksStore)

const tasks = computed(() => allTasks.value.filter((task) => task.type === TaskType.BUY))

useSwalObserver({
  toggle: shouldTrackPurchaseTask,
  onResolve() {
    for (const task of tasks.value) {
      advanceTask(task)
    }
  },
})
</script>

<template>
  <Checkbox v-model="shouldTrackPurchaseTask">
    <template #default> Track purchase task </template>
    <template #subtitle> Count cheese no more </template>
  </Checkbox>

  <Teleport v-if="shouldTrackPurchaseTask" :to="`#${marketControlsId}`">
    <div id="sa-market-task-tracker-container">
      <TaskTracker v-for="task of tasks" :key="task.title" :task="task" />
    </div>
  </Teleport>
</template>

<style lang="scss">
#sa-market-task-tracker-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
