<script setup lang="ts">
import FocusItem from "./FocusItem.vue"
import Verification from "./Verification.vue"

import { useBattleStore } from "../store"

import { Checkbox } from "@/components"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable, wrapAnchorWithButton } from "@/utils"
import { watchEffect } from "vue"
import { getAttackButton } from "../utils"
import { useDialogObserver } from "@/hooks"

const battleStore = useBattleStore()
const { shouldAutoFocusAttack } = storeToRefs(battleStore)

const attackButton = getAttackButton()
const observer = attackButton && focusOnButtonEnable(attackButton)

watchEffect(() => {
  if (!observer) return

  if (shouldAutoFocusAttack.value) observer.connect()
  else observer.disconnect()
})

useDialogObserver({
  onOpen: ({ title, el }) => {
    if (!title.toLowerCase().includes("winner")) return

    const exitAnchor = el.querySelector("a")
    if (!exitAnchor) return

    const exitButton = wrapAnchorWithButton(exitAnchor)
    exitButton.focus()
  },
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusAttack">
    <template #default> Autofocus attack button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
  <FocusItem />
  <Verification />
</template>
