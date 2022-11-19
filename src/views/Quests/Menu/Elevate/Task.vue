<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "../store"
import { storeToRefs } from "pinia"
import { nextTick, watchEffect } from "vue"
import { TASK_QUEST_CLASS } from "@/views/Quests/Menu/helpers"

const { shouldElevateTaskQuests } = storeToRefs(useQuestsMenuStore())

watchEffect(async () => {
  await nextTick()

  const elements = document.querySelectorAll<HTMLButtonElement>(`.${TASK_QUEST_CLASS}`)
  if (!elements.length) return

  for (const el of elements) {
    if (shouldElevateTaskQuests.value) el.classList.add("elevated-item")
    else el.classList.remove("elevated-item")
  }
})
</script>

<template>
  <Checkbox pos="left" v-model="shouldElevateTaskQuests">
    <template #default> Elevate <span class="task-color-highlight"> incomplete task quests </span> </template>
    <template #subtitle>
      Search task quests no more
      <br />
      Elevated as long as task is incomplete
      <br />
      <span class="footnote">Now 100% accurate, thanks Mike :)</span>
    </template>
  </Checkbox>
</template>

<style lang="scss">
.footnote {
  font-size: 0.8rem;
  opacity: 0.65;
}

.task-color-highlight {
  color: goldenrod;
}
</style>
