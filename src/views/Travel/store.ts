import { defineStore } from "pinia"
import { ref } from "vue"

export const useTravelStore = defineStore(
  "travel",
  () => {
    const shouldAutoFocusStep = ref(false)
    const shouldAutoFocusEncounters = ref(false)
    const shouldAutoFocusVerification = ref(false)
    const shouldHelpTrackStepsTaskProgress = ref(false)

    const lastStepResponse = ref<null | TravelResponse>(null)

    return {
      shouldAutoFocusStep,
      shouldAutoFocusEncounters,
      shouldAutoFocusVerification,
      shouldHelpTrackStepsTaskProgress,
      lastStepResponse,
    }
  },
  {
    persist: true,
  }
)

export type StepType = "text" | "material" | "npc"

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
  step_type: StepType
  text: string
  userAmount: string
}
