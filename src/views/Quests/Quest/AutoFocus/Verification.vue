<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestStore } from "../store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const questStore = useQuestStore()
const { shouldAutoFocusVerification } = storeToRefs(questStore)

const resultsNode = document.querySelector("#result")
const observer = new MutationObserver((mutations) => {
  mutations.forEach((record) => {
    const element = record.target.firstChild as HTMLElement

    const anchor = element.querySelector<HTMLAnchorElement>("a")
    if (!anchor) return

    anchor.removeAttribute("target")

    const button = element.querySelector<HTMLButtonElement>("button")
    if (!button) return

    setTimeout(() => {
      button.focus()
    }, 1050)
  })
})

watch(
  shouldAutoFocusVerification,
  (val) => {
    if (!resultsNode) return

    if (val) observer.observe(resultsNode, { childList: true, subtree: true })
    else observer.disconnect()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusVerification">
    <template #default> Autofocus verification </template>
    <template #subtitle> Will open in this tab </template>
  </Checkbox>
</template>
