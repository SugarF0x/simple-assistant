<script setup lang="ts">
import { Checkbox } from "@/components"
import { useQuestStore } from "../store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"
import { focusOnButtonEnable } from "@/utils"
import { getPerformButton } from "../utils"

const questStore = useQuestStore()
const { shouldAutoFocusPerform } = storeToRefs(questStore)

const performButton = getPerformButton()
const observer = performButton && focusOnButtonEnable(performButton)

watchEffect(() => {
  if (!observer) return

  if (shouldAutoFocusPerform.value) observer.connect()
  else observer.disconnect()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusPerform">
    <template #default> Autofocus perform button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
