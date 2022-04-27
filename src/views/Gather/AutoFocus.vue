<script setup lang="ts">
import { Checkbox } from "@/components"
import { useGatherStore } from "./store"
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { focusOnButtonEnable } from "@/utils"

const gatherStore = useGatherStore()
const { shouldAutoFocusAction } = storeToRefs(gatherStore)

const actionButton = document.querySelector<HTMLButtonElement>("#crafting_button")
const observer = actionButton && focusOnButtonEnable(actionButton)

watch(
  shouldAutoFocusAction,
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
  <Checkbox v-model="shouldAutoFocusAction">
    <template #default> Autofocus action button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
