import { onMounted } from "vue"
import { interceptRequest } from "@/utils"

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

export function useBridge(cb?: (detail: TravelResponse) => void) {
  function handleBridge({ detail }: CustomEvent) {
    cb?.(JSON.parse(detail))
  }

  onMounted(() => {
    interceptRequest((data) => {
      document.querySelector("#travelDataBridge")?.dispatchEvent(new CustomEvent("bridge", { detail: data }))
    })
  })

  return {
    handleBridge,
  }
}
