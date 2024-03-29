<script setup lang="ts">
import { Checkbox } from "@/components"
import { KillSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, watchEffect } from "vue"
import { useCarriageStore } from "@/views/Carriage/store"
import TaskTracker from "@/components/TaskTracker.vue"

const carriageStore = useCarriageStore()
const { shouldHighlightTrackedZones } = storeToRefs(carriageStore)

const tasksStore = useTasksStore()
const { tasks, shouldTrackTasks } = storeToRefs(tasksStore)
const killTasks = computed(() =>
  tasks.value.filter(
    (task): task is KillSomeTask => task.type === TaskType.KILL_SOME && task.progress < task.requirement
  )
)
const locations = computed(() => killTasks.value.flatMap((task) => task.locations))

watchEffect(() => {
  const grid = document.querySelector<HTMLUListElement>("ul.grid")

  if (!shouldHighlightTrackedZones.value || !shouldTrackTasks.value) {
    grid?.classList.remove("task-zone-highlight")
    return
  }

  grid?.classList.add("task-zone-highlight")
  const cards = Array.from(grid?.children || []) as HTMLElement[]

  for (const card of cards) {
    const locationIndex = locations.value.indexOf(card.querySelector("h3")?.innerText || "")
    if (locationIndex === -1) continue
    card.classList.add("task-zone")
    card.setAttribute("data-zone", String(locationIndex))
  }
})
</script>

<template>
  <Checkbox v-model="shouldHighlightTrackedZones" :parent="shouldTrackTasks" @enable-required="shouldTrackTasks = true">
    <template #default> Track task locations </template>
    <template #subtitle>
      Highlight zones where kill task NPCs reside
      <br />
      Only highlights incomplete zones
    </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <div v-if="shouldHighlightTrackedZones">
    <template v-for="(task, index) of killTasks" :key="task + index">
      <Teleport
        v-for="location of task.locations"
        :key="task.target + '-' + location"
        :to="`.task-zone[data-zone=&quot;${locations.indexOf(location)}&quot;] .flex-1.flex.flex-col.p-4`"
      >
        <TaskTracker stack :task="task" style="margin-top: 0.5rem" />
      </Teleport>
    </template>
  </div>
</template>

<style lang="scss">
.task-zone-highlight {
  .task-zone {
    order: -1;
    outline: 5px solid lightgreen;
  }
}
</style>
