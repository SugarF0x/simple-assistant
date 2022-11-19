<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "@/views/Quests/Menu/store"
import { storeToRefs } from "pinia"
import { nextTick, watchEffect } from "vue"
import { LAST_INCOMPLETE_QUEST_ID } from "@/views/Quests/Menu/helpers"

const { shouldElevateLastIncompleteQuest } = storeToRefs(useQuestsMenuStore())

watchEffect(async () => {
  await nextTick()

  const element = document.querySelector<HTMLButtonElement>(`#${LAST_INCOMPLETE_QUEST_ID}`)
  if (!element) return

  const listItem = element.parentElement
  if (!listItem) return

  if (shouldElevateLastIncompleteQuest.value) listItem.classList.add("elevated-item")
  else listItem.classList.remove("elevated-item")
})
</script>

<template>
  <Checkbox pos="left" v-model="shouldElevateLastIncompleteQuest">
    <template #default> Elevate <span class="incomplete-color-highlight"> last incomplete quest </span> </template>
    <template #subtitle> Gotta catch up on them % bonuses </template>
  </Checkbox>
</template>

<style lang="scss">
.incomplete-color-highlight {
  color: green;
}
</style>
