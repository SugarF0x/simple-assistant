<script setup lang="ts">
import { Checkbox } from "@/components"
import { onBeforeMount } from "vue"
import { useBattleStore } from "../store"
import { storeToRefs } from "pinia"

const battleStore = useBattleStore()
const { shouldAutoFocusVerification } = storeToRefs(battleStore)

onBeforeMount(() => {
  new MutationObserver((mutations) => {
    mutations.forEach((record) => {
      const element = record.target as HTMLElement
      if (element.id !== "swal2-content") return
      const anchor = element.querySelector<HTMLAnchorElement>("a")
      if (!anchor) return
      anchor.removeAttribute("target")
    })
  }).observe(document.body, { childList: true, subtree: true })
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusVerification">
    <template #default> Autofocus verification </template>
    <template #subtitle> Will open in this tab </template>
  </Checkbox>
</template>
