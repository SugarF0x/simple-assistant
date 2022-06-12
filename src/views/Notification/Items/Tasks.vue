<script setup lang="ts">
import BaseItem from "./BaseItem.vue"
import { Button } from "@/components"
import { useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const tasksStore = useTasksStore()
const { shouldShowReminders, lastUpdateTimestamp, areTasksComplete, isRewardCollected } = storeToRefs(tasksStore)
const shouldShowUpdateNotification = computed(() => shouldShowReminders.value && !lastUpdateTimestamp.value)
const shouldShowCollectNotification = computed(
  () => shouldShowReminders.value && areTasksComplete.value && !isRewardCollected.value
)
</script>

<template>
  <BaseItem v-if="shouldShowUpdateNotification" @dismiss="lastUpdateTimestamp = new Date().toISOString()">
    <template #title> New tasks available! </template>
    <template #text> Go see what's on your today's TODO list! </template>
    <template #actions>
      <Button href="/tasks/viewall"> Go to Tasks </Button>
    </template>
  </BaseItem>
  <BaseItem v-if="shouldShowCollectNotification" @dismiss="isRewardCollected = true">
    <template #title> All tasks complete! </template>
    <template #text> Go get your reward! </template>
    <template #actions>
      <Button href="/tasks/viewall"> Collect </Button>
    </template>
  </BaseItem>
</template>
