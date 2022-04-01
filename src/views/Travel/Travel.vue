<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useTravelStore } from "@/store"
import { useBridge } from "./useBridge"

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
  <Teleport to=".travel-content">
    <div class="timestamp">Timestamp: {{ cooldownTimestamp || "null" }}</div>
  </Teleport>
  <div id="travelDataBridge" @bridge="handleBridge" />
</template>

<style lang="scss">
.timestamp {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  color: grey;
}
</style>
