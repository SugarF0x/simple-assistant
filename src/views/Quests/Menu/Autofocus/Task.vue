<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "../store"
import { storeToRefs } from "pinia"
import { nextTick, watch } from "vue"

const questsStore = useQuestsMenuStore()
const { shouldElevateTaskQuests, shouldAutoFocusTaskQuest } = storeToRefs(questsStore)

watch(
  shouldAutoFocusTaskQuest,
  async (val) => {
    await nextTick()

    if (!val) return
    document.querySelector<HTMLButtonElement>(".incomplete-task-quest")?.focus()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox pos="left" v-model="shouldAutoFocusTaskQuest" :parent="shouldElevateTaskQuests">
    <template #default> Autofocus quest tasks </template>
    <template #subtitle>
      Autofocus first elevated task quest
      <br />
      Takes priority over last incomplete quest
    </template>
    <template #requires> Requires task quest elevation enabled </template>
  </Checkbox>
</template>
