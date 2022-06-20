<script setup lang="ts">
import { Checkbox } from "@/components"
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable } from "@/utils"
import { watchEffect } from "vue"

const travelStore = useTravelStore()
const { shouldAutoFocusStep } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>("#step_button")
const observer = travelButton && focusOnButtonEnable(travelButton)

watchEffect(() => {
  if (!observer) return

  if (shouldAutoFocusStep.value) observer.connect()
  else observer.disconnect()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusStep">
    <template #default> Autofocus step button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
