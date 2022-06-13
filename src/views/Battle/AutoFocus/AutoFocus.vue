<script setup lang="ts">
import FocusItem from "./FocusItem.vue"
import Verification from "./Verification.vue"
import { useHealthObserver } from "../hooks"

import { useBattleStore } from "../store"
import { useAttackButton } from "./useAttackButton"

import { Checkbox } from "@/components"
import { storeToRefs } from "pinia"
import { wrapAnchorWithButton } from "@/utils"

const battleStore = useBattleStore()
const { shouldAutoFocusAttack } = storeToRefs(battleStore)

useAttackButton(shouldAutoFocusAttack)
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
