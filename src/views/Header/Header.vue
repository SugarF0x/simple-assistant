<script setup lang="ts">
import { Controls, Subtitle } from "@/components"
import { useFtueStore } from "@/views/FTUE/store"
import { storeToRefs } from "pinia"

const ftueStore = useFtueStore()
const { isDismissed } = storeToRefs(ftueStore)

const version = chrome.runtime.getManifest().version
</script>

<template>
  <Controls to=".px-4.text-center">
    <h2>
      <span>Simple assistant</span>
      <a
        class="version text-indigo-600"
        target="_blank"
        title="View changelog"
        href="https://github.com/SugarF0x/simple-assistant/blob/master/CHANGELOG.md"
      >
        v{{ version }}
      </a>
    </h2>
    <div>
      <i>v11.1.1 compatible</i>
    </div>
    <Subtitle>
      <button @click="isDismissed = false">&lt; show disclaimer &gt;</button>
    </Subtitle>
  </Controls>
</template>
