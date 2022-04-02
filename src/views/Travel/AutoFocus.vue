<script setup lang="ts">
import { onMounted, watch } from "vue"
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"

const travelStore = useTravelStore()
const { cooldownTimeLeft, shouldAutoFocus } = storeToRefs(travelStore)

const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

watch(
  cooldownTimeLeft,
  (val) => {
    if (!shouldAutoFocus.value) return
    if (!val) return
    if (!travelButton) return

    setTimeout(() => {
      travelButton.focus()
    }, val + 30)
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  if (!shouldAutoFocus.value) return
  if (!travelButton) return
  travelButton.focus()
})
</script>

<template>
  <div class="wrapper">
    <label class="inputLabel">
      <input v-model="shouldAutoFocus" type="checkbox" class="labelCheckbox" />
      <span class="labelText">Autofocus step button</span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputLabel {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.labelText {
  margin-left: 0.35rem;
}

.labelCheckbox {
  cursor: pointer;
}
</style>
