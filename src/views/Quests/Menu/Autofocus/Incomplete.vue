<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "../store"
import { storeToRefs } from "pinia"
import { nextTick, watch } from "vue"
import { LAST_INCOMPLETE_QUEST_ID } from "@/views/Quests/Menu/helpers"

const questsStore = useQuestsMenuStore()
const { shouldElevateLastIncompleteQuest, shouldAutoFocusLastIncompleteQuest } = storeToRefs(questsStore)

watch(
  shouldAutoFocusLastIncompleteQuest,
  async (val) => {
    await nextTick()

    if (!val) return
    document.querySelector<HTMLButtonElement>(`#${LAST_INCOMPLETE_QUEST_ID}`)?.focus()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox
    pos="left"
    v-model="shouldAutoFocusLastIncompleteQuest"
    :parent="shouldElevateLastIncompleteQuest"
    @enable-required="shouldElevateLastIncompleteQuest = true"
  >
    <template #default> Autofocus last incomplete quest </template>
    <template #subtitle> Just hit space/enter! </template>
    <template #requires> Requires last incomplete quest elevation enabled </template>
  </Checkbox>
</template>
