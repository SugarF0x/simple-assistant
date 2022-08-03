<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestStore } from "@/views/Quests/Quest/store"
import { QuestAnyTask, QuestSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, watchEffect } from "vue"
import TaskTracker from "@/components/TaskTracker.vue"

const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".web-app-container a"))
const questAnchor = anchors.find((e) => e.href.includes("view/"))
const questTitle = questAnchor?.innerText

const questsStore = useQuestStore()
const { shouldTrackTaskQuests } = storeToRefs(questsStore)

const tasksStore = useTasksStore()
const { advanceTask } = tasksStore
const { shouldTrackTasks, tasks } = storeToRefs(tasksStore)

const questTasks = computed(() =>
  tasks.value.filter((task): task is QuestSomeTask | QuestAnyTask =>
    [TaskType.QUEST_ANY, TaskType.QUEST_SOME].includes(task.type)
  )
)
const validTasks = computed(() =>
  questTasks.value.filter(
    (task) => task.type === TaskType.QUEST_ANY || task.target.toLowerCase() === questTitle?.toLowerCase()
  )
)

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

  <template v-if="shouldTrackTaskQuests">
    <Teleport to="main .text-center">
      <div class="tasks">
        <TaskTracker v-for="task in questTasks" :key="task.title" :task="task" />
        <TaskTracker v-if="!questTasks.length" :task="null" />
      </div>
    </Teleport>
  </template>
</template>

<style lang="scss" scoped>
.tasks {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
