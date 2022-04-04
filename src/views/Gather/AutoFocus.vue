<script setup lang="ts">
import { Checkbox } from "@/components"
import { useGatherStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { focusOnButtonEnable } from "@/utils"

const gatherStore = useGatherStore()
const { shouldAutoFocusAction } = storeToRefs(gatherStore)

onMounted(() => {
  if (!shouldAutoFocusAction.value) return

  const actionButton = document.querySelectorAll<HTMLButtonElement>(".py-6.max-w-7xl.mx-auto.px-4.relative button")[1]
  if (!actionButton) return

  focusOnButtonEnable(actionButton)
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusAction">
    <template #default> Autofocus action button </template>
    <template #subtitle> Just hit space! </template>
  </Checkbox>
</template>
