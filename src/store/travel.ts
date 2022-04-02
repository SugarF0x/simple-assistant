import { defineStore } from "pinia"
import { computed, onMounted, ref } from "vue"

export const useTravelStore = defineStore(
  "travel",
  () => {
    const lastStepResponse = ref<null | TravelResponse>(null)
    const cooldownTimestamp = ref<null | string>(null)

    const cooldownTimeLeft = computed(() => {
      if (!cooldownTimestamp.value) return 0
      return Math.max(new Date(cooldownTimestamp.value).valueOf() - Date.now(), 0)
    })

    onMounted(() => {
      if (!cooldownTimestamp.value) return

      setTimeout(() => {
        cooldownTimestamp.value = null
      }, cooldownTimeLeft.value)
    })

    return {
      cooldownTimestamp,
      cooldownTimeLeft,
      lastStepResponse,
    }
  },
  {
    persist: {
      serializer: {
        deserialize: (store) => {
          const parsed = JSON.parse(store)
          const date = new Date(parsed.cooldownTimestamp)
          if (date.valueOf() < Date.now()) parsed.cooldownTimestamp = null
          return parsed
        },
        serialize: JSON.stringify,
      },
    },
  }
)

export interface TravelResponse {
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
