<script setup lang="ts">
import { Checkbox } from "@/components"
import { useHomeStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const homeStore = useHomeStore()
const { shouldAutoFocusTravel } = storeToRefs(homeStore)

onMounted(() => {
  const anchor = document.querySelector<HTMLAnchorElement>("main .backdrop-blur-md a")
  if (!anchor) return
  const button = wrapAnchorWithButton(anchor)

  if (shouldAutoFocusTravel.value) button.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusTravel">
    <template #default> Autofocus travel button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
