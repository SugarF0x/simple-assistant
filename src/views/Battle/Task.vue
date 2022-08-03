<script setup lang="ts">
import { Checkbox, TaskTracker } from "@/components"
import { KillAnyTask, KillSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { useBattleStore } from "./store"
import { storeToRefs } from "pinia"
import { computed, onBeforeMount } from "vue"
import { useHealthObserver } from "./hooks"
import { getBackgroundImageUrl } from "./utils"
import { getAverageImageColor, getContrastingColor } from "@/utils"

const tasksStore = useTasksStore()
const { advanceTask } = tasksStore
const { tasks, shouldTrackTasks } = storeToRefs(tasksStore)
const battleStore = useBattleStore()
const { shouldHelpTrackTasks } = storeToRefs(battleStore)

const contrastingColor = getContrastingColor(getAverageImageColor(getBackgroundImageUrl()))

const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".web-app-container a"))
const npcAnchor = anchors.find((e) => e.href.includes("npc"))
const npcName = npcAnchor?.innerText

const killTasks = computed(() =>
  tasks.value.filter((task): task is KillSomeTask | KillAnyTask =>
    [TaskType.KILL_ANY, TaskType.KILL_SOME].includes(task.type)
  )
)
const matchingTasks = computed(() =>
  killTasks.value.filter((task) => task.type === TaskType.KILL_ANY || task.target === npcName)
)

useHealthObserver(shouldHelpTrackTasks, () => {
  matchingTasks.value.forEach((task) => {
    advanceTask(task)
  })
})

onBeforeMount(() => {
  const tasksContainer = document.querySelector<HTMLDivElement>(".w-full.h-full.flex.items-center")
  if (!tasksContainer) throw new Error("No task tracker container found")
  tasksContainer.setAttribute("style", "position: relative")
})
</script>

<template>
  <Checkbox v-model="shouldHelpTrackTasks" :parent="shouldTrackTasks" @enable-required="shouldTrackTasks = true">
    <template #default> Help track quests </template>
    <template #subtitle> See how many kills got left </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <template v-if="shouldHelpTrackTasks">
    <Teleport to=".w-full.h-full.flex.items-center">
      <div class="tasks">
        <TaskTracker v-for="task in killTasks" :key="task.title" :task="task" :color="contrastingColor" />
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss" scoped>
.tasks {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  color: white;
}
</style>
