<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestStore } from "../store"
import { storeToRefs } from "pinia"
import { onMounted, watch } from "vue"
import { focusOnButtonEnable } from "@/utils"

const questStore = useQuestStore()
const { shouldAutoFocusPerform } = storeToRefs(questStore)

const performButton = document.querySelector<HTMLButtonElement>("#performQuestButton")
const observer = performButton && focusOnButtonEnable(performButton)

onMounted(() => {
  if (!observer) return

  /** Well this was a weird one... */
  const action = performButton.getAttribute("x-on:click")
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
})

watch(
  shouldAutoFocusPerform,
  (val) => {
    if (!observer) return

    if (val) observer.connect()
    else observer.disconnect()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusPerform">
    <template #default> Autofocus perform button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
