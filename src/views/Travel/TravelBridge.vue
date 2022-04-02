<script setup lang="ts">
import { TravelResponse, useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { interceptRequest } from "@/utils"

const travelStore = useTravelStore()
const { cooldownTimestamp, lastStepResponse } = storeToRefs(travelStore)

function handleBridge({ detail }: CustomEvent) {
  const data: TravelResponse = JSON.parse(detail)
  lastStepResponse.value = data

  const msWait = (data.nextwait + 1) * 1000
  cooldownTimestamp.value = new Date(Date.now() + msWait).toISOString()
  setTimeout(() => {
    cooldownTimestamp.value = null
  }, msWait)
}

onMounted(() => {
  interceptRequest((data) => {
    document.querySelector("#travelDataBridge")?.dispatchEvent(new CustomEvent("bridge", { detail: data }))
  })
})
</script>

<template>
  <div id="travelDataBridge" @bridge="handleBridge" />
</template>
