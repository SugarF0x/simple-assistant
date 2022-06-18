<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "../store"
import { storeToRefs } from "pinia"
import { computed, nextTick, onBeforeMount, watch } from "vue"
import { QuestSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const questsStore = useQuestsMenuStore()
const { shouldElevateTaskQuests } = storeToRefs(questsStore)

const questSomeTasks = computed(() =>
  tasks.value.filter(
    (task): task is QuestSomeTask => task.type === TaskType.QUEST_SOME && task.progress < task.requirement
  )
)

onBeforeMount(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!ul) return

  const children = Array.from(ul.children) as HTMLButtonElement[]
  for (const child of children) {
    if (!questSomeTasks.value.some((task) => child.innerText.includes(task.target))) continue
    child.classList.add("incomplete-task-quest")
  }
})

watch(
  shouldElevateTaskQuests,
  async (toggle) => {
    await nextTick()

    const elements = document.querySelectorAll<HTMLButtonElement>(".incomplete-task-quest")
    if (!elements.length) return

    for (const el of elements) {
      if (toggle) el.classList.add("elevated-item")
      else el.classList.remove("elevated-item")
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox pos="left" v-model="shouldElevateTaskQuests">
    <template #default> Elevate <span class="task-color-highlight"> incomplete task quests </span> </template>
    <template #subtitle>
      Search task quests no more
      <br />
      Elevated as long as task is incomplete
    </template>
  </Checkbox>
</template>

<style lang="scss">
$COLOR: goldenrod;

.task-color-highlight {
  color: $COLOR;
}

.incomplete-task-quest {
  &.elevated-item {
    box-shadow: 0 0 0 1px $COLOR;
  }
}
</style>
