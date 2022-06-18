<script setup lang="ts">
import { TravelResponse, useTravelStore } from "./store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { interceptRequest } from "@/utils"

const travelStore = useTravelStore()
const { cooldownTimestamp, lastStepResponse } = storeToRefs(travelStore)

function handleBridge({ detail: data }: CustomEvent<TravelResponse>) {
  lastStepResponse.value = data

  cooldownTimestamp.value = new Date(Date.now() + data.nextwait).toISOString()
  setTimeout(() => {
    cooldownTimestamp.value = null
  }, data.nextwait)
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
