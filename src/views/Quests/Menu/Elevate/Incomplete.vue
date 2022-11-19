<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "@/views/Quests/Menu/store"
import { storeToRefs } from "pinia"
import { nextTick, onBeforeMount, watch } from "vue"

const questsStore = useQuestsMenuStore()
const { shouldElevateLastIncompleteQuest } = storeToRefs(questsStore)

onBeforeMount(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!ul) return

  const children = Array.from(ul.children).reverse()
  for (const child of children) {
    if (child.querySelector("svg")) continue
    child.id = "last-incomplete-quest"
    break
  }
})

watch(
  shouldElevateLastIncompleteQuest,
  async (toggle) => {
    await nextTick()

    const element = document.querySelector<HTMLButtonElement>("#last-incomplete-quest")
    if (!element) return

    if (toggle) element.classList.add("elevated-item")
    else element.classList.remove("elevated-item")
  },
  {
    immediate: true,
  }
)
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
