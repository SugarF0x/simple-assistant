<script setup lang="ts">
import { Checkbox } from "@/components"
import { useGatherStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

const gatherStore = useGatherStore()
const { shouldAutoFocusAction } = storeToRefs(gatherStore)

onMounted(() => {
  if (!shouldAutoFocusAction.value) return

  const actionButton = document.querySelectorAll<HTMLButtonElement>(".py-6.max-w-7xl.mx-auto.px-4.relative button")[1]
  if (!actionButton) return

  actionButton.focus()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "disabled") {
        if (!actionButton.attributes.getNamedItem("disabled")) actionButton.focus()
      }
    })
  })

  observer.observe(actionButton, {
    attributes: true,
  })
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusAction">
    <template #default> Autofocus action button </template>
    <template #subtitle> Just hit space! </template>
  </Checkbox>
</template>
