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
const { tasks } = storeToRefs(tasksStore)

const purchaseTask = computed(() => tasks.value.find((task) => task.type === TaskType.BUY))

useSwalObserver({
  toggle: shouldTrackPurchaseTask,
  onResolve() {
    if (purchaseTask.value) advanceTask(purchaseTask.value)
  },
})
</script>

<template>
  <Checkbox v-model="shouldTrackPurchaseTask">
    <template #default> Track purchase task </template>
    <template #subtitle> Count cheese no more </template>
  </Checkbox>

  <Teleport v-if="shouldTrackPurchaseTask" :to="`#${marketControlsId}`">
    <TaskTracker :task="purchaseTask" style="position: absolute; bottom: 0; right: 0" />
  </Teleport>
</template>
