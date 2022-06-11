<script setup lang="ts">
import { Checkbox } from "@/components"
import { useTravelStore } from "../store"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable } from "@/utils"
import { watch } from "vue"

const travelStore = useTravelStore()
const { shouldAutoFocusStep } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>("#take_a_step_button")
const observer = travelButton && focusOnButtonEnable(travelButton)

watch(
  shouldAutoFocusStep,
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
  <Checkbox v-model="shouldAutoFocusStep">
    <template #default> Autofocus step button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
