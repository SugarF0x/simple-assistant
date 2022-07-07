<script setup lang="ts">
import { Checkbox } from "@/components"
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable } from "@/utils"
import { watchEffect } from "vue"
import { getStepButton } from "../utils"

const travelStore = useTravelStore()
const { shouldAutoFocusStep } = storeToRefs(travelStore)

const stepButton = getStepButton()
const observer = stepButton && focusOnButtonEnable(stepButton)

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
