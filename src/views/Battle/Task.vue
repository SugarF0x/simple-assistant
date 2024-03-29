<script setup lang="ts">
import { Checkbox, TaskTracker } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { useBattleStore } from "./store"
import { storeToRefs } from "pinia"
import { computed, onBeforeMount } from "vue"
import { useHealthObserver } from "./hooks"
import { getBackgroundImageUrl } from "./utils"
import { getAverageImageColor, getContrastingColor } from "@/utils"

const tasksStore = useTasksStore()
const { advanceTask } = tasksStore
const { allTasks, shouldTrackTasks } = storeToRefs(tasksStore)
const battleStore = useBattleStore()
const { shouldHelpTrackTasks } = storeToRefs(battleStore)

const contrastingColor = getContrastingColor(getAverageImageColor(getBackgroundImageUrl()))

const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".web-app-container a"))
const npcAnchor = anchors.find((e) => e.href.includes("npc"))
const npcName = npcAnchor?.innerText ?? ''

const validTasks = computed(() => allTasks.value.filter(task => [
  task.title.toLowerCase().includes('kill'),
  task.title.toLowerCase().includes(npcName)
].some(Boolean)))

useHealthObserver(shouldHelpTrackTasks, () => {
  for (const task of validTasks.value) {
    advanceTask(task)
  }
})

onBeforeMount(() => {
  const tasksContainer = document.querySelector<HTMLDivElement>(".rounded-lg.h-96")
  if (!tasksContainer) throw new Error("No task tracker container found")
  tasksContainer.style.position = "relative"
})
</script>

<template>
  <Checkbox v-model="shouldHelpTrackTasks" :parent="shouldTrackTasks" @enable-required="shouldTrackTasks = true">
    <template #default> Help track quests </template>
    <template #subtitle> See how many kills got left </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <template v-if="shouldHelpTrackTasks">
    <Teleport to=".rounded-lg.h-96">
      <div class="tasks">
        <TaskTracker v-for="task in validTasks" :key="task.title" :task="task" :color="contrastingColor" />
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss" scoped>
.tasks {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  color: white;
}
</style>
