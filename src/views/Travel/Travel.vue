<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useTravelStore } from "@/store"
import { useBridge } from "./useBridge"
import { useTravelButton } from "./useTravelButton"
import { useTravelBar } from "./useTravelBar"

useTravelButton()
useTravelBar()

const travelStore = useTravelStore()
const { cooldownTimestamp } = storeToRefs(travelStore)

const { handleBridge } = useBridge((data) => {
  const msWait = (data.nextwait + 1) * 1000
  cooldownTimestamp.value = new Date(Date.now() + msWait).toISOString()
  setTimeout(() => {
    cooldownTimestamp.value = null
  }, msWait)
})
</script>

<template>
  <div id="travelDataBridge" @bridge="handleBridge" />
</template>
