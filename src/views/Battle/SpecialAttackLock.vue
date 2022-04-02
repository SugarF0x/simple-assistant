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
    if (val) specialButton.classList.add("opacity-40")
    else specialButton.classList.remove("opacity-40")
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <label class="inputLabel">
    <input v-model="isSpecialDisabled" type="checkbox" />
    <span class="labelText">Disable special attack</span>
  </label>
</template>

<style scoped lang="scss">
.inputLabel {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.labelText {
  margin-left: 0.35rem;
}
</style>
