<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { focusOnButtonEnable } from "@/utils"

const questStore = useQuestStore()
const { shouldAutoFocusPerform } = storeToRefs(questStore)

onMounted(() => {
  if (!shouldAutoFocusPerform.value) return

  const performButton = document.querySelector<HTMLButtonElement>("#questButton")
  if (!performButton) return
  performButton.setAttribute("wire:key", "dirty_socks")

  const action = performButton.getAttribute("x-on:mouseup")
  if (!action) return

  /** Well this was a weird one... */
  performButton.removeAttribute("x-on:mouseup")
  performButton.setAttribute(
    "x-on:click",
    `
    if (!window.firstClicked) {
      window.firstClicked = true;
    } else {
      window.firstClicked = false;
      ${action}
    }
  `
  )

  focusOnButtonEnable(performButton)
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusPerform">
    <template #default> Autofocus perform button* </template>
    <template #subtitle> Just hit space! </template>
  </Checkbox>
</template>
