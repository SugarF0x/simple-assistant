<script setup lang="ts">
import { Checkbox } from "@/components"
import { useBattleStore } from "../store"
import { storeToRefs } from "pinia"
import { useDialogObserver } from "@/hooks"
import { wrapAnchorWithButton } from "@/utils"

const battleStore = useBattleStore()
const { shouldAutoFocusVerification } = storeToRefs(battleStore)

useDialogObserver({
  toggle: shouldAutoFocusVerification,
  onOpen: ({ title, el }) => {
    if (!title.toLowerCase().includes("hold")) return

    const verificationAnchor = el.querySelector("a")
    if (!verificationAnchor) return

    verificationAnchor.removeAttribute("target")

    const verificationButton = wrapAnchorWithButton(verificationAnchor)
    verificationButton.focus()
  },
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusVerification">
    <template #default> Autofocus verification </template>
    <template #subtitle> Will open in this tab </template>
  </Checkbox>
</template>
