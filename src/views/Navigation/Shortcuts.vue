<script setup lang="ts">
import { Checkbox, Button } from "@/components"
import { useNavigationStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted, reactive, ref, watchEffect } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const navigationStore = useNavigationStore()
const { shouldUseShortcuts, shouldEditShortcuts, urlToKeyMap, keyToUrlMap } = storeToRefs(navigationStore)

const tabIdSelected = ref("")
const urls = reactive<string[]>([])

const visibleButtons = reactive<HTMLButtonElement[]>([])
const arrowSelectedButton = ref<null | number>(null)

watchEffect(() => {
  if (arrowSelectedButton.value === null) return

  visibleButtons[arrowSelectedButton.value]?.focus()
})

/** Wrap navigation anchors with buttons */
onMounted(() => {
  const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav.mt-5.flex-1.px-2 a"))

  for (const anchor of anchors) {
    const button = wrapAnchorWithButton(anchor)
    button.setAttribute("style", "width: 100%;")
    urls.push(String(anchor.getAttribute("href")))
    if (!Array.from(button.classList).join(" ").includes("hidden")) visibleButtons.push(button)
  }
})

function keyBindListener(e: KeyboardEvent) {
  if (tabIdSelected.value) return
  if (!e.shiftKey) return

  if (e.code in keyToUrlMap.value)
    return document.querySelector<HTMLButtonElement>(`a[href='${keyToUrlMap.value[e.code]}'] button`)?.focus()

  if (["ArrowUp", "ArrowDown"].includes(e.code)) {
    if (arrowSelectedButton.value === null) return (arrowSelectedButton.value = 0)

    let newValue = e.code === "ArrowUp" ? arrowSelectedButton.value - 1 : arrowSelectedButton.value + 1

    if (newValue >= visibleButtons.length) return (arrowSelectedButton.value = 0)
    if (newValue < 0) return (arrowSelectedButton.value = visibleButtons.length - 1)
    return (arrowSelectedButton.value = newValue)
  }
}

watchEffect(() => {
  if (shouldUseShortcuts.value) document.addEventListener("keydown", keyBindListener)
  else document.removeEventListener("keydown", keyBindListener)
})

function keyEditListener(e: KeyboardEvent) {
  if (!tabIdSelected.value) return
  if (e.code === "Space") return
  if (e.code.toLowerCase().includes("shift")) return

  if (e.code === "Backspace") {
    delete urlToKeyMap.value[tabIdSelected.value]
  } else {
    if (e.code in keyToUrlMap.value) delete urlToKeyMap.value[keyToUrlMap.value[e.code]]
    urlToKeyMap.value = {
      ...urlToKeyMap.value,
      [tabIdSelected.value]: e.code,
    }
  }

  tabIdSelected.value = ""
}

watchEffect(() => {
  if (shouldEditShortcuts.value) document.addEventListener("keydown", keyEditListener)
  else document.removeEventListener("keydown", keyEditListener)
})

function handleSetterButtonClick(url: string) {
  if (tabIdSelected.value === url) tabIdSelected.value = ""
  else tabIdSelected.value = url
}

function getSetterButtonText(url: string): string {
  if (tabIdSelected.value === url) return "Press"
  return (urlToKeyMap.value[url] || "unset").replace("Digit", "").replace("Key", "")
}
</script>

<template>
  <Checkbox v-model="shouldUseShortcuts">
    <template #default> Use shortcuts </template>
    <template #subtitle>
      Bind keys to tabs
      <br />
      Use Shift + Key to execute
      <br />
      Use Shift + Arrow keys to select
    </template>
  </Checkbox>
  <Checkbox v-model="shouldEditShortcuts" :parent="shouldUseShortcuts" @enable-required="shouldUseShortcuts = true">
    <template #default> Edit keybindings </template>
    <template #subtitle>
      Hit select & press desired button
      <br />
      Backspace to unset
    </template>
    <template #requires> Requires shortcuts enabled </template>
  </Checkbox>

  <template v-if="shouldUseShortcuts">
    <Teleport v-for="url in urls" :key="url" :to="`a[href='${url}'] button`">
      <Button
        v-if="shouldEditShortcuts || url in urlToKeyMap"
        class="keyInput"
        :class="{ noEvents: !shouldEditShortcuts }"
        :disabled="!shouldEditShortcuts"
        @click.prevent="handleSetterButtonClick(url)"
      >
        {{ getSetterButtonText(url) }}
      </Button>
    </Teleport>
  </template>
</template>

<style lang="scss" scoped>
.keyInput {
  margin-left: auto;
  padding: 2px 4px;
}

.noEvents {
  pointer-events: none;
}
</style>
