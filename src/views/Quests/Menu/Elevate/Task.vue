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
    const img = child.querySelector("img")
    if (!img) continue

    const src = img.getAttribute("src")
    if (!src) continue

    if (!questSomeTasks.value.some((task) => task.icon === src)) continue

    const matchedWords = child.innerText
      .toLowerCase()
      .split(/[ \n]/)
      .reduce<string[]>((acc, val) => {
        if (["the", "of", "in", "at", "as", "from", ""].includes(val)) return acc
        if (questSomeTasks.value.some((task) => task.target.toLowerCase().includes(val))) acc.push(val)
        return acc
      }, [])
    if (matchedWords.length < 2) continue

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
      <br />
      <span class="footnote">Might be not 100% accurate cuz Mike does not like me :(</span>
    </template>
  </Checkbox>
</template>

<style lang="scss">
$COLOR: goldenrod;

.footnote {
  font-size: 0.8rem;
  opacity: 0.65;
}

.task-color-highlight {
  color: $COLOR;
}

.incomplete-task-quest {
  &.elevated-item {
    box-shadow: 0 0 0 1px $COLOR;
  }
}
</style>
