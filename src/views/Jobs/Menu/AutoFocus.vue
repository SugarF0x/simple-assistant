<script setup lang="ts">
import { Checkbox } from "@/components"
import { useJobsMenuStore } from "./store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const jobsMenuStore = useJobsMenuStore()
const { shouldAutoFocusGotoJobButton } = storeToRefs(jobsMenuStore)

const gotoButton = document.querySelector<HTMLButtonElement>(
  ".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.text-center button"
)

watch(
  shouldAutoFocusGotoJobButton,
  (val) => {
    if (!val) return
    if (!gotoButton) return

    gotoButton.focus()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGotoJobButton">
    <template #default> Autofocus job button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
