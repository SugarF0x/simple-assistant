<script setup lang="ts">
import { Checkbox } from "@/components"

import { useBattleStore } from "@/store"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const battleStore = useBattleStore()
const { isSpecialDisabled } = storeToRefs(battleStore)

const specialButton = document.querySelectorAll<HTMLButtonElement>(
  ".bg-white.mt-4.rounded-md.p-8.text-center button"
)[1]

watch(
  isSpecialDisabled,
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
  <Checkbox v-model="isSpecialDisabled"> Disable special attack </Checkbox>
</template>

<style lang="scss">
.disabledSpecialAttackButton {
  opacity: 0.4;
  pointer-events: none;
  cursor: none;
}
</style>
