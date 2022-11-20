<script setup lang="ts">
import SafeModeTimer from "./SafeModeTimer.vue"
import DevStateIcon from "./DevStateIcon.vue"
import { Controls, Subtitle } from "@/components"
import { useFtueStore } from "@/views/FTUE/store"
import { storeToRefs } from "pinia"

const ftueStore = useFtueStore()
const { isDismissed } = storeToRefs(ftueStore)

const version = chrome.runtime.getManifest().version
const gameVersion = "11.39"
</script>

<template>
  <Controls to=".px-4.text-center" id="sa-header">
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
      <i>v{{ gameVersion }} compatible</i>
    </div>
    <Subtitle>
      <button @click="isDismissed = false">&lt; show disclaimer &gt;</button>
    </Subtitle>

    <DevStateIcon />
    <SafeModeTimer />
  </Controls>
</template>

<style lang="scss">
#sa-header {
  margin-bottom: -1rem;

  .dark & {
    color: white;
  }
}

// sa header parent
.px-4.text-center[x-show="webAppSideBar"] {
  position: relative;
}
</style>
