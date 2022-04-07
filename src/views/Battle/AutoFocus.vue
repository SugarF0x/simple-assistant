<script setup lang="ts">
import { Checkbox } from "@/components"
import { useBattleStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { focusOnButtonEnable, wrapAnchorWithButton } from "@/utils"

const isSpan = (node: Node): node is HTMLSpanElement => "innerText" in node

const battleStore = useBattleStore()
const { shouldAutoFocusAttack } = storeToRefs(battleStore)

/** return button replace & focus */
onMounted(() => {
  if (!shouldAutoFocusAttack.value) return

  const opponentHp = document.querySelector("#opponent-hp")
  if (!opponentHp) return

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) return
      if (!isSpan(mutation.target)) return
      if (mutation.target.innerText !== "0") return

      const closeAnchor = document.querySelector<HTMLAnchorElement>(".swal2-popup.swal2-modal.swal2-show a")
      if (!closeAnchor) return

      wrapAnchorWithButton(closeAnchor).focus()
    })
  })

  observer.observe(opponentHp, {
    childList: true,
  })
})

/** attack button focus */
onMounted(() => {
  if (!shouldAutoFocusAttack.value) return

  const attackButton = document.querySelector<HTMLButtonElement>(".bg-white.mt-4.rounded-md.p-8.text-center button")
  if (!attackButton) return

  focusOnButtonEnable(attackButton)
})
</script>

<template>
  <Checkbox v-model="shouldAutoFocusAttack">
    <template #default> Autofocus attack button* </template>
    <template #subtitle> Just hit space! </template>
  </Checkbox>
</template>
