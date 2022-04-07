<script setup lang="ts">
import { Checkbox, SButton } from "@/components"
import { useNavigationStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted, reactive, ref, watch } from "vue"
import { wrapAnchorWithButton } from "@/utils"

const navigationStore = useNavigationStore()
const { shouldUseShortcuts, shouldEditShortcuts, urlToKeyMap, keyToUrlMap } = storeToRefs(navigationStore)

const tabIdSelected = ref("")
const urls = reactive<string[]>([])

/** Wrap navigation anchors with buttons */
onMounted(() => {
  const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("nav.mt-5.flex-1.px-2 a"))

  for (const anchor of anchors) {
    const button = wrapAnchorWithButton(anchor)
    button.setAttribute("style", "width: 100%;")
    urls.push(String(anchor.getAttribute("href")))
  }
})

function keyBindListener(e: KeyboardEvent) {
  if (tabIdSelected.value) return

  if (e.code in keyToUrlMap.value)
    document.querySelector<HTMLButtonElement>(`a[href='${keyToUrlMap.value[e.code]}'] button`)?.focus()
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

function keyEditListener(e: KeyboardEvent) {
  if (!tabIdSelected.value) return
  if (e.code === "Space") return

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

watch(
  shouldEditShortcuts,
  (val) => {
    if (val) document.addEventListener("keydown", keyEditListener)
    else document.removeEventListener("keydown", keyEditListener)
  },
  {
    immediate: true,
  }
)

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
    <template #subtitle> Bind keys to tabs </template>
  </Checkbox>
  <Checkbox
    :model-value="shouldUseShortcuts ? shouldEditShortcuts : false"
    @update:modelValue="shouldEditShortcuts = $event"
    :disabled="!shouldUseShortcuts"
  >
    <template #default> Edit keybindings </template>
    <template #subtitle>
      Hit select & press desired button
      <br />
      Backspace to unset
    </template>
  </Checkbox>

  <template v-if="shouldUseShortcuts">
    <Teleport v-for="url in urls" :key="url" :to="`a[href='${url}'] button`">
      <SButton
        class="keyInput"
        :class="!shouldEditShortcuts && 'noEvents'"
        :disabled="!shouldEditShortcuts"
        @click.prevent="handleSetterButtonClick(url)"
      >
        {{ getSetterButtonText(url) }}
      </SButton>
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
