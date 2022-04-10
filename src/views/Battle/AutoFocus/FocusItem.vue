<script setup lang="ts">
import { Checkbox } from "@/components"
import { useBattleStore } from "@/views/Battle/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { onReenable } from "@/utils"

const battleStore = useBattleStore()
const { shouldAutoFocusItem, carrotCapacityDepletionTime, isMushroomQuotaDepleted } = storeToRefs(battleStore)

onMounted(() => {
  if (!shouldAutoFocusItem.value) return
  if (isMushroomQuotaDepleted.value) return

  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".bg-white.mt-4.rounded-md.p-8.text-center button")
  )
  const attackButton = buttons[0]
  const itemButton = buttons.find((element) => element.innerText.toLowerCase().includes("item"))
  if (!itemButton) return

  const remainingItems = Number(itemButton.innerText.replace(/[^0-9]/g, ""))
  if (!remainingItems) return

  function itemButtonClickHandler() {
    if (!itemButton) return
    if (!attackButton) return

    attackButton.setAttribute("disabled", "disabled")
    attackButton.removeAttribute("disabled")

    itemButton.removeEventListener("click", itemButtonClickHandler)

    onReenable(itemButton, () => {
      const popupTextElement = document.querySelector<HTMLSpanElement>(".swal2-content")
      if (!popupTextElement) return

      if (popupTextElement.innerText.toLowerCase().includes("in one day")) {
        carrotCapacityDepletionTime.value = new Date().toISOString()
      }
    })
  }

  itemButton.addEventListener("click", itemButtonClickHandler)

  itemButton.focus()
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusItem">
    <template #default> Autofocus item on page load </template>
    <template #subtitle>
      Don't forget to eat your shrooms!
      <br />
      Disables on no items left or mushroom daily quota depletion
    </template>
  </Checkbox>
</template>
