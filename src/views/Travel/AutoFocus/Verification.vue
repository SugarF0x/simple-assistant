<script setup lang="ts">
import { Checkbox } from "@/components"
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const travelStore = useTravelStore()
const { shouldAutoFocusVerification, lastStepResponse } = storeToRefs(travelStore)

watch(lastStepResponse, (val) => {
  if (!shouldAutoFocusVerification.value) return
  if (!val?.text?.includes("/i-am-not-a-bot")) return

  /** let dom hydrate */
  setTimeout(() => {
    const verificationAnchor = document.querySelector<HTMLAnchorElement>("div:has(>.travel-text) a")
    if (!verificationAnchor) return

    verificationAnchor.removeAttribute("target")
    wrapAnchorWithButton(verificationAnchor).focus()
  }, 510)
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusVerification">
    <template #default> Autofocus verification button </template>
    <template #subtitle> Will open in this tab </template>
  </Checkbox>
</template>
