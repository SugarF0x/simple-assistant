<script setup lang="ts">
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { interceptRequest } from "@/utils"

const travelStore = useTravelStore()
const { cooldownTimestamp } = storeToRefs(travelStore)

function handleBridge({ detail }: CustomEvent) {
  const data: TravelResponse = JSON.parse(detail)
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

<script lang="ts">
interface TravelResponse {
  action: string
  buttons: boolean
  currentEXP: number
  currentGold: number
  exp_amount: number
  gold_amount: number
  guild_raid_exp: false
  heading: string
  level: number
  modifiers: {
    gold_modifiers: []
    exp_modifiers: []
    droprate_modifiers: []
    stepping_modifiers: []
  }
  nextwait: number
  resultText: string
  rewardAmount: number
  rewardType: string
  step_type: string
  text: string
  userAmount: string
}
</script>
