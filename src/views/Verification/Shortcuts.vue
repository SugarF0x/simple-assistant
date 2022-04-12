<script setup lang="ts">
import { Checkbox, Button } from "@/components"
import { useVerificationStore } from "./store"
import { storeToRefs } from "pinia"
import { onBeforeMount, ref, watch } from "vue"

const verificationStore = useVerificationStore()
const { shouldUseShortcuts } = storeToRefs(verificationStore)

const isVerified = ref(false)

onBeforeMount(() => {
  let divButtonsWrapper = document.querySelector<HTMLDivElement>(".grid.grid-cols-4.gap-2")
  if (!divButtonsWrapper) return

  divButtonsWrapper.innerHTML = divButtonsWrapper.innerHTML.replaceAll("div", "button")
  Array.from(divButtonsWrapper.querySelectorAll("button")).forEach((button, index) => {
    button.id = `btn-${index + 1}`
    button.classList.add("verificationButton")
  })

  new MutationObserver((mutations) => {
    mutations.forEach((record) => {
      const element = record.target as HTMLElement
      if (element.id !== "swal2-title") return
      if (!element.innerText.toLowerCase().includes("success")) return
      isVerified.value = true
    })
  }).observe(document.body, { childList: true, subtree: true })
})

watch(isVerified, (val) => {
  setTimeout(() => {
    if (!val) return
    const button = document.querySelector<HTMLButtonElement>("#backButton")
    if (!button) return
    button.focus()
  })
})

function keyBindListener(e: KeyboardEvent) {
  const key = Number(e.code.replaceAll("Digit", ""))
  if (isNaN(key) || ![1, 2, 3, 4].includes(key)) return

  document.querySelector<HTMLButtonElement>(`#btn-${key}`)?.focus()
}

watch(
  shouldUseShortcuts,
  (val) => {
    if (val) document.addEventListener("keydown", keyBindListener)
    else document.removeEventListener("keydown", keyBindListener)
  },
  {
    immediate: true,
  }
)

function goBack() {
  window.location.href = document.referrer
}
</script>

<template>
  <Checkbox v-model="shouldUseShortcuts">
    <template #default> Use shortcuts </template>
    <template #subtitle>
      Tap 1-4 to select, space/enter to confirm
      <br />
      Popup modal will take you back
    </template>
  </Checkbox>

  <template v-if="shouldUseShortcuts">
    <Teleport v-for="n in 4" :key="n" :to="`#btn-${n}`">
      <Button disabled style="padding: 4px">
        {{ n }}
      </Button>
    </Teleport>
  </template>

  <Teleport v-if="isVerified" to=".swal2-popup.swal2-modal.swal2-show">
    <Button style="margin-top: 1rem" id="backButton" @click="goBack"> Take me back! </Button>
  </Teleport>
</template>

<!-- it is being injected in the onBeforeMount hook -->
<!--suppress CssUnusedSymbol -->
<style lang="css">
.verificationButton {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
</style>
