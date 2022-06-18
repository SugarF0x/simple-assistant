<script setup lang="ts">
import { QuestSomeTask, TaskType, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const questTasks = computed(() =>
  tasks.value.filter((task): task is QuestSomeTask => task.type === TaskType.QUEST_SOME)
)
const questTitles = computed(() => questTasks.value.map((task) => task.title))

const matches = ref<HTMLDivElement[]>([])
onMounted(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  Array.from(ul?.children ?? []).forEach((entry) => {
    if (questTitles.value.some((e) => entry.innerHTML.includes(e))) matches.value.push(entry as HTMLDivElement)
  })

  console.log(Object.assign([], matches.value))
})
</script>
