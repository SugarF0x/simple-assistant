<script setup lang="ts">
import { Checkbox, TaskTracker } from "@/components"
import { StepTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { computed, ref, watch } from "vue"

const travelStore = useTravelStore()
const { shouldHelpTrackStepsTaskProgress, lastStepResponse } = storeToRefs(travelStore)

const taskStore = useTasksStore()
const { advanceTask } = taskStore
const { tasks, shouldTrackTasks } = storeToRefs(taskStore)
const task = computed(() => tasks.value.filter((entry): entry is StepTask => entry.type === TaskType.STEP)[0])

const shouldShowHUD = computed(() => shouldTrackTasks.value && shouldHelpTrackStepsTaskProgress.value)

watch(lastStepResponse, (response) => {
  if (!shouldTrackTasks.value) return
  if (!shouldHelpTrackStepsTaskProgress.value) return
  if (!task.value) return
  if (!response) return
  if (!response.step_type) return

  advanceTask(task.value)
})

const isSlotCreated = ref(false)
watch(
  shouldHelpTrackStepsTaskProgress,
  (val) => {
    if (!val) return
    if (isSlotCreated.value) return

    const container = document.querySelector("#complete-travel-container")
    const hudCard = container?.children[0]
    const hudContent = hudCard?.querySelector<HTMLDivElement>(".p-4")
    if (!hudContent) throw new Error("No hud content container found")

    const hudText = hudContent.querySelector<HTMLSpanElement>(".w-0")
    hudText?.classList.remove("w-0")

    const hudSlot = document.createElement("div")
    hudSlot.setAttribute("id", "hudSlot")

    hudContent.classList.add("hudCard")
    hudContent.appendChild(hudSlot)

    isSlotCreated.value = true
  },
  { immediate: true }
)
</script>

<template>
  <Checkbox v-model="shouldHelpTrackStepsTaskProgress" :parent="shouldTrackTasks">
    <template #default> Help track steps task progress </template>
    <template #subtitle> See just how many steps you need </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <Teleport v-if="shouldShowHUD" to="#hudSlot">
    <TaskTracker :task="task" />
  </Teleport>
</template>

<style lang="scss">
.hudCard {
  display: flex;
  justify-content: space-between;
}

#hudSlot {
  color: white;
  margin-right: 5rem;
}
</style>
