<script setup lang="ts">
import { Checkbox } from "@/components"

import { useBattleStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"

const battleStore = useBattleStore()
const { shouldDisableSpecial } = storeToRefs(battleStore)

const specialButton = document.querySelector<HTMLButtonElement>("#attackButton_special")

watchEffect(() => {
  if (!specialButton) return

  specialButton.disabled = shouldDisableSpecial.value
  if (shouldDisableSpecial.value) {
    specialButton.classList.add("disabledSpecialAttackButton")
    specialButton.tabIndex = -1
  } else {
    specialButton.classList.remove("disabledSpecialAttackButton")
    specialButton.removeAttribute("tabIndex")
  }
})
</script>

<template>
  <Checkbox v-model="shouldDisableSpecial">
    <template #default> Disable special attack </template>
    <template #subtitle> Ever miss-clicked on special attack and wasted your energy? Well I did </template>
  </Checkbox>
</template>

<style lang="scss">
.disabledSpecialAttackButton {
  opacity: 0.4;
  pointer-events: none;
  cursor: none;
}
</style>
