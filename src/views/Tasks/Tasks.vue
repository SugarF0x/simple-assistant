<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { createControlsSlot } from "@/utils"
import { getResetTimestamp, parseTasks } from "./helpers"
import { onMounted } from "vue"

const controlsAnchor = document.querySelector(".web-app-container div")
createControlsSlot(controlsAnchor)

const { shouldTrackTasks, shouldShowReminders, tasks, resetTimestamp } = storeToRefs(useTasksStore())

const parsedTasks = parseTasks()
const category = parsedTasks[0].category

onMounted(async () => {
  const timestamp = await getResetTimestamp()

  tasks.value[category] = parsedTasks
  resetTimestamp.value[category] = timestamp
})
</script>

<template>
  <Controls>
    <Checkbox v-model="shouldTrackTasks">
      <template #default> Track tasks </template>
      <template #subtitle> Help tracking step, kill & quest completion progress </template>
    </Checkbox>
    <Checkbox v-model="shouldShowReminders" :parent="shouldTrackTasks" @enable-required="shouldTrackTasks = true">
      <template #default> Show notifications </template>
      <template #subtitle> Remind you to update tasks & collect rewards </template>
      <template #requires> Requires task tracking to be enabled </template>
    </Checkbox>
  </Controls>
</template>
