<script setup lang="ts">
import { Modal, Button } from "@/components"
import changelogMarkdown from "../../../CHANGELOG.md"
import { useGeneralStore } from "./store"
import { storeToRefs } from "pinia"
import { ref } from "vue"

const { lastSeenVersion } = storeToRefs(useGeneralStore())
const currentVersion = chrome.runtime.getManifest().version

interface UpdateLog {
  id: string
  nodes: Element[]
}

const changelogWrapperElement = document.createElement("div")
changelogWrapperElement.innerHTML = changelogMarkdown
const versions = Array.from(changelogWrapperElement.children).reduce<UpdateLog[]>((acc, val) => {
  if (val.nodeName === "H2" || val.nodeName === "H1") {
    const id = val.querySelector("a")?.innerText ?? ""
    if (!id) return acc
    acc.push({ id, nodes: [val] })
  } else {
    acc[acc.length - 1].nodes.push(val)
  }

  return acc
}, [])

const htmlToDisplay = ref("")

if (lastSeenVersion.value !== currentVersion) {
  const missedUpdates: UpdateLog[] = []

  for (const version of versions) {
    if (version.id === lastSeenVersion.value) break
    missedUpdates.push(version)
  }

  htmlToDisplay.value = missedUpdates.reduce<string>((acc, val) => {
    acc += val.nodes.map((e) => e.outerHTML).join("")
    return acc
  }, "")
}
</script>

<template>
  <Modal v-if="lastSeenVersion !== currentVersion && htmlToDisplay">
    <h1>What's new?</h1>

    <div v-html="htmlToDisplay" />

    <Button @click="lastSeenVersion = currentVersion"> Dismiss </Button>
  </Modal>
</template>
