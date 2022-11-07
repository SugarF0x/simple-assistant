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
  <Modal v-if="lastSeenVersion !== currentVersion && htmlToDisplay" class="sa-changelog-modal">
    <h1 class="title">What's new?</h1>

    <div class="changelog" v-html="htmlToDisplay" />

    <Button class="dismiss" @click="lastSeenVersion = currentVersion"> Dismiss </Button>
  </Modal>
</template>

<style scoped lang="scss">
.title {
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 8px;
}

.changelog {
  display: flex;
  flex-direction: column;

  :deep(h1),
  :deep(h2) {
    margin: 8px auto;
  }
  :deep(h1) {
    font-size: 24px;
  }
  :deep(h2) {
    font-size: 20px;
  }
  :deep(h3) {
    font-size: 18px;
    font-weight: bold;
  }
  :deep(ul) {
    list-style: unset;
  }
  :deep(li) {
    margin-left: 16px;
  }
  :deep(a) {
    text-decoration: underline;
  }
}

.dismiss {
  margin-left: auto;
  margin-top: 16px;
}
</style>

<style lang="scss">
.sa-changelog-modal {
  display: flex;
  flex-direction: column;
}
</style>
