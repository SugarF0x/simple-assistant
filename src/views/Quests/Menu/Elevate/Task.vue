<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "../store"
import { storeToRefs } from "pinia"
import { nextTick, watch } from "vue"

const questsStore = useQuestsMenuStore()
const { shouldElevateTaskQuests } = storeToRefs(questsStore)

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
