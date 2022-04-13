<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "./store"
import { storeToRefs } from "pinia"
import { onBeforeMount, ref, watch } from "vue"

const questsMenuStore = useQuestsMenuStore()
const { shouldElevateLastIncompleteQuest } = storeToRefs(questsMenuStore)

const lastIncompleteElement = ref<HTMLLIElement | null>(null)
onBeforeMount(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!ul) return

  ul.classList.add("modifiedListStyle")

  const children = Array.from(ul.children).reverse()
  for (const child of children) {
    if (child.querySelector("svg")) continue
    child.id = "latest"
    lastIncompleteElement.value = child as HTMLLIElement
    break
  }
})

watch(
  [shouldElevateLastIncompleteQuest, lastIncompleteElement],
  ([toggle, element]) => {
    if (!element) return
    if (toggle) element.classList.add("elevatedItem")
    else element.classList.remove("elevatedItem")
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldElevateLastIncompleteQuest">
    <template #default> Elevate last incomplete quest </template>
    <template #subtitle> Gotta catch up on them % bonuses </template>
  </Checkbox>
</template>

<style lang="scss">
.modifiedListStyle {
  display: flex;
  flex-flow: column;
}

.elevatedItem {
  order: -1;
  margin-bottom: 1.5rem !important;
}
</style>
