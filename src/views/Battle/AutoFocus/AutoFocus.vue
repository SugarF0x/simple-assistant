<script setup lang="ts">
import FocusItem from "./FocusItem.vue"
import Verification from "./Verification.vue"
import { useHealthObserver } from "../hooks"

import { useBattleStore } from "../store"

import { Checkbox } from "@/components"
import { storeToRefs } from "pinia"
import { focusOnButtonEnable, wrapAnchorWithButton } from "@/utils"
import { watchEffect } from "vue"
import { getAttackButton } from "../utils"

const battleStore = useBattleStore()
const { shouldAutoFocusAttack } = storeToRefs(battleStore)

const attackButton = getAttackButton()
const observer = attackButton && focusOnButtonEnable(attackButton)

watchEffect(() => {
  if (!observer) return

  if (shouldAutoFocusAttack.value) observer.connect()
  else observer.disconnect()
})

useHealthObserver(shouldAutoFocusAttack, () => {
  const closeAnchor = document.querySelector<HTMLAnchorElement>(".swal2-popup.swal2-modal.swal2-show a")
  if (!closeAnchor) return

  wrapAnchorWithButton(closeAnchor).focus()
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
