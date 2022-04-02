<script setup lang="ts">
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
      specialButton.attributes.removeNamedItem("tabIndex")
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div class="wrapper">
    <label class="inputLabel">
      <input v-model="isSpecialDisabled" type="checkbox" class="labelCheckbox" />
      <span class="labelText">Disable special attack</span>
    </label>
  </div>
</template>

<style lang="scss">
.disabledSpecialAttackButton {
  opacity: 0.4;
  pointer-events: none;
  cursor: none;
}
</style>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputLabel {
  cursor: pointer;
  user-select: none;
}

.labelText {
  margin-left: 0.35rem;
}

.labelCheckbox {
  cursor: pointer;
}
</style>
