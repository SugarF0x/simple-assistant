<script setup lang="ts">
import { Checkbox } from "@/components"

import { useBattleStore } from "./store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const battleStore = useBattleStore()
const { shouldDisableSpecial } = storeToRefs(battleStore)

const specialButton = document.querySelector<HTMLButtonElement>("#attackButton_special")

watch(
  shouldDisableSpecial,
  (val) => {
    if (!specialButton) return
    specialButton.disabled = val
    if (val) {
      specialButton.classList.add("disabledSpecialAttackButton")
      specialButton.tabIndex = -1
    } else {
      specialButton.classList.remove("disabledSpecialAttackButton")
      specialButton.removeAttribute("tabIndex")
    }
  },
  {
    immediate: true,
  }
)
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
