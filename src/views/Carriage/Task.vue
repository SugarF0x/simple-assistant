<script setup lang="ts">
import { Checkbox } from "@/components"
import { KillSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, watch } from "vue"
import { useCarriageStore } from "@/views/Carriage/store"

const carriageStore = useCarriageStore()
const { shouldHighlightTrackedZones } = storeToRefs(carriageStore)

const tasksStore = useTasksStore()
const { tasks, shouldTrackTasks } = storeToRefs(tasksStore)
const killTasks = computed(() =>
  tasks.value.filter(
    (task): task is KillSomeTask => task.type === TaskType.KILL_SOME && task.progress < task.requirement
  )
)
const locations = computed(() => killTasks.value.map((task) => task.location))

watch(
  shouldHighlightTrackedZones,
  (val) => {
    const grid = document.querySelector<HTMLUListElement>("ul.grid")

    if (!val || !shouldTrackTasks.value) {
      grid?.classList.remove("task-zone-highlight")
      return
    }

    grid?.classList.add("task-zone-highlight")
    const cards = Array.from(grid?.children || []) as HTMLElement[]

    for (const card of cards) {
      if (!locations.value.includes(card.querySelector("h3")?.innerText || "")) continue
      card.classList.add("task-zone")
    }
  },
  { immediate: true }
)
</script>

<template>
  <Checkbox v-model="shouldHighlightTrackedZones" :parent="shouldTrackTasks">
    <template #default> Track task locations </template>
    <template #subtitle> Highlight zones where kill task NPCs reside </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>
</template>

<style lang="scss">
.task-zone-highlight {
  .task-zone {
    order: -1;
    outline: 5px solid lightgreen;
  }
}
</style>
