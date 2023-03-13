<script setup lang="ts">
import BaseItem from "./_BaseItem.vue"
import { Button } from "@/components"
import { TaskCategory, useTasksStore } from "@/views/Tasks/store"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { taskCategoryToUrlMap } from "@/consts"
import { add, isAfter } from "date-fns"
import { getCategory } from "@/views/Tasks/helpers/parser/getTask"

const { shouldShowReminders, isRewardCollected, isRewardReady, tasks, resetTimestamp } = storeToRefs(useTasksStore())

const readyRewardCategoryStrings = computed<TaskCategory[]>(() =>
  Object.entries(isRewardReady.value).reduce<TaskCategory[]>((acc, [key, value]) => {
    const category = key as TaskCategory

    if (value && !isRewardCollected.value[category]) acc.push(category)
    return acc
  }, [])
)

const rewardReadyHref = computed<string>(() => taskCategoryToUrlMap[readyRewardCategoryStrings.value[0]] ?? "")

const currentTaskCategory = computed<TaskCategory | null>(() => {
  try {
    return getCategory()
  } catch {
    return null
  }
})

const tasksUpdatedCategoryStrings = computed<TaskCategory[]>(() =>
  Object.entries(tasks.value).reduce<TaskCategory[]>((acc, [key, val]) => {
    const category = key as TaskCategory
    if (!val.length && isAfter(new Date(), new Date(resetTimestamp.value[category] ?? 0)) && currentTaskCategory.value !== key) acc.push(category)
    return acc
  }, [])
)

const taskUpdatedHref = computed<string>(() => taskCategoryToUrlMap[tasksUpdatedCategoryStrings.value[0]] ?? "")

const shouldShowUpdateNotification = computed(() => Boolean(shouldShowReminders.value && tasksUpdatedCategoryStrings.value.length))
const shouldShowCollectNotification = computed(() => Boolean(shouldShowReminders.value && readyRewardCategoryStrings.value.length))

function flagReadyRewardsAsCollected() {
  for (const category of readyRewardCategoryStrings.value) {
    isRewardReady.value[category] = true
  }
}

function postponeRefreshedTaskUpdateByOneHour() {
  for (const category of tasksUpdatedCategoryStrings.value) {
    resetTimestamp.value[category] = add(new Date(), { hours: 1 }).toISOString()
  }
}
</script>

<template>
  <BaseItem v-if="shouldShowUpdateNotification" @dismiss="postponeRefreshedTaskUpdateByOneHour">
    <template #title> New tasks available! </template>
    <template #text>
      <p>Go see what's on your today's TODO list!</p>
      <p>Tasks have updated for the following categories: {{ tasksUpdatedCategoryStrings.join(", ") }}</p>
    </template>
    <template #actions>
      <Button :href="taskUpdatedHref"> Go to Tasks </Button>
    </template>
  </BaseItem>

  <BaseItem v-if="shouldShowCollectNotification" @dismiss="flagReadyRewardsAsCollected">
    <template #title> All tasks complete! </template>
    <template #text>
      <p>Go get your reward!</p>
      <p>Reward is available for the following categories: {{ readyRewardCategoryStrings.join(", ") }}</p>
    </template>
    <template #actions>
      <Button :href="rewardReadyHref"> Collect </Button>
    </template>
  </BaseItem>
</template>
