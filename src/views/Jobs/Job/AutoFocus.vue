<script setup lang="ts">
import { Checkbox } from "@/components"
import { useJobStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"

const jobStore = useJobStore()
const { shouldAutoFocusJobActionButton } = storeToRefs(jobStore)

const performButton = document.querySelector<HTMLButtonElement>(
  ".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden button"
)

watchEffect(() => {
  if (!shouldAutoFocusJobActionButton.value) return
  if (!performButton) return

  performButton.focus()

  performButton.addEventListener("click", () => {
    /** let dom hydrate */
    setTimeout(() => {
      const range = document.querySelector<HTMLInputElement>('input[type="range"]')
      if (!range) return

      range.focus()
    })
  })
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusJobActionButton">
    <template #default> Autofocus perform job button </template>
    <template #subtitle>
      Just press space/enter!
      <br />
      Time range will also be auto selected
      <br />
      Use arrow keys to adjust and hit enter
    </template>
  </Checkbox>
</template>
