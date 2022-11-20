<script setup lang="ts">
import { Checkbox } from "@/components"
import { useJobsMenuStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"

const jobsMenuStore = useJobsMenuStore()
const { shouldAutoFocusGotoJobButton } = storeToRefs(jobsMenuStore)

const gotoButton = document.querySelector<HTMLButtonElement>(".web-app-container .mt-2 button")

watchEffect(() => {
  if (!shouldAutoFocusGotoJobButton.value) return
  if (!gotoButton) return

  gotoButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusGotoJobButton">
    <template #default> Autofocus job button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
