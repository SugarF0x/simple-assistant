<script setup lang="ts">
import { Checkbox, Card } from "@/components"
import { useQuestStore } from "@/views/Quests/Quest/store"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, watchEffect } from "vue"
import TaskTracker from "@/components/TaskTracker.vue"

const questPointsElement = Array.from(document.querySelector(".web-app-container > div")?.children ?? []).at(-4)
const questsTrackerSlot = document.createElement("div")
questsTrackerSlot.id = "sa-quest-tracker"
questPointsElement?.insertAdjacentElement("afterend", questsTrackerSlot)

const questsStore = useQuestStore()
const { shouldTrackTaskQuests } = storeToRefs(questsStore)

const tasksStore = useTasksStore()
const { advanceTask } = tasksStore
const { shouldTrackTasks, allTasks } = storeToRefs(tasksStore)

const validTasks = computed(() => allTasks.value.filter((task) => task.url.includes(location.pathname) || task.url.includes("quests/viewall")))

const resultsNode = document.querySelector("#result")
const observer = new MutationObserver((mutations) => {
  mutations.forEach((record) => {
    const element = record.target.firstChild as HTMLElement
    if (element.innerText.includes("Success")) validTasks.value.forEach((task) => advanceTask(task))
  })
})

watchEffect(() => {
  if (!resultsNode) return

  if (shouldTrackTaskQuests.value) observer.observe(resultsNode, { childList: true, subtree: true })
  else observer.disconnect()
})
</script>

<template>
  <Checkbox v-model="shouldTrackTaskQuests" :parent="shouldTrackTasks" @enable-required="shouldTrackTasks = true">
    <template #default> Track task quests </template>
    <template #subtitle> See your daily task progress </template>
    <template #requires> Requires task tracking enabled </template>
  </Checkbox>

  <template v-if="shouldTrackTaskQuests && validTasks.length">
    <Teleport to="#sa-quest-tracker">
      <Card class="tasks">
        <TaskTracker v-for="task in validTasks" :key="task.title" :task="task" class="task-item" />
      </Card>
    </Teleport>
  </template>
</template>

<style lang="scss">
#sa-quest-tracker {
  .task-item {
    justify-content: center;
  }
}
</style>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem 0;
  gap: .5rem;

  & > div {
    min-width: 40%;
  }
}
</style>
