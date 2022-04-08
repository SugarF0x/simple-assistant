<script setup lang="ts">
import { Checkbox } from "@/components"
import { useHomeStore } from "./store"
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const homeStore = useHomeStore()
const { shouldAutoFocusTravel } = storeToRefs(homeStore)

const anchor = document.querySelector<HTMLAnchorElement>("main .backdrop-blur-md a")
const button = anchor && wrapAnchorWithButton(anchor)

watch(
  shouldAutoFocusTravel,
  (val) => {
    if (!button) return
    if (!val) return
    button.focus()
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusTravel">
    <template #default> Autofocus travel button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
</template>
