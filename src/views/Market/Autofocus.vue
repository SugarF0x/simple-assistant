<script setup lang="ts">
import { Checkbox } from "@/components"
import { useMarketStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"
import { useSwalObserver } from "@/hooks"

const { shouldAutoFocusFirstItem } = storeToRefs(useMarketStore())

function selectFirstButton() {
  const firstButton = document.querySelector<HTMLButtonElement>("tbody button")
  firstButton?.focus()
}

useSwalObserver({
  toggle: shouldAutoFocusFirstItem,
  onReject(el) {
    if (el.innerText.includes("sold")) window.location.reload()
  },
  onClose() {
    selectFirstButton()
  },
})

watchEffect(() => {
  if (shouldAutoFocusFirstItem.value) selectFirstButton()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusFirstItem">
    <template #default> Autofocus first item </template>
    <template #subtitle> Press space them bulk purchases </template>
  </Checkbox>
</template>
