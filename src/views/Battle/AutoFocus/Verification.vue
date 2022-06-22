<script setup lang="ts">
import { Checkbox } from "@/components"
import { useBattleStore } from "../store"
import { storeToRefs } from "pinia"
import { useSwalObserver } from "@/hooks"

const battleStore = useBattleStore()
const { shouldAutoFocusVerification } = storeToRefs(battleStore)

useSwalObserver({
  toggle: shouldAutoFocusVerification,
  onOpen(element) {
    const anchor = element.querySelector<HTMLAnchorElement>("a")
    if (!anchor) return
    if (!anchor.innerText.includes("verif")) return

    anchor.removeAttribute("target")
  },
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusVerification">
    <template #default> Autofocus verification </template>
    <template #subtitle> Will open in this tab </template>
  </Checkbox>
</template>
