<script setup lang="ts">
import { Controls } from "@/components"

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
  </Controls>
</template>
