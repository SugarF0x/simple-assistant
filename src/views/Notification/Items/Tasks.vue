<script setup lang="ts">
import BaseItem from "./BaseItem.vue"
import { Button } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const tasksStore = useTasksStore()
const { shouldRemindToUpdateTasks, lastUpdateTimestamp } = storeToRefs(tasksStore)
const shouldShowNotification = computed(() => shouldRemindToUpdateTasks.value && !lastUpdateTimestamp.value)
</script>

<template>
  <BaseItem v-if="shouldShowNotification" @dismiss="lastUpdateTimestamp = new Date().toISOString()">
    <template #title> New tasks available! </template>
    <template #text> Go see what's on your today's TODO list! </template>
    <template #actions>
      <Button href="/tasks/viewall"> Go to Tasks </Button>
    </template>
  </BaseItem>
</template>
