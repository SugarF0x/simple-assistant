<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestsMenuStore } from "./store"
import { storeToRefs } from "pinia"
import { onBeforeMount, watch } from "vue"

const questsMenuStore = useQuestsMenuStore()
const { shouldAutoFocusLastIncompleteQuest, shouldElevateLastIncompleteQuest } = storeToRefs(questsMenuStore)

onBeforeMount(() => {
  const ul = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!ul) return

  ul.innerHTML = ul.innerHTML.replaceAll("<li", "<button")
  ul.innerHTML = ul.innerHTML.replaceAll("</li", "</button")
  Array.from(ul.children).forEach((child) => {
    child.classList.add("button-text-left")
  })
})

watch(
  [shouldElevateLastIncompleteQuest, shouldAutoFocusLastIncompleteQuest],
  ([shouldElevate, shouldFocus]) => {
    if (!shouldElevate || !shouldFocus) return

    /** let button transform kick in */
    setTimeout(() => {
      const quest = document.querySelector<HTMLButtonElement>("#latest")
      if (!quest) return
      quest.focus()
    })
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusLastIncompleteQuest" :parent="shouldElevateLastIncompleteQuest">
    <template #default> Autofocus last incomplete quest </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>

<style lang="scss">
.button-text-left {
  text-align: left !important;
}
</style>
