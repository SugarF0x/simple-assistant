import { defineStore } from "pinia"
import { ref } from "vue"

export const useBattleStore = defineStore(
  "battle",
  () => {
    const shouldDisableSpecial = ref(false)
    const shouldAutoFocusAttack = ref(false)

    return {
      shouldDisableSpecial,
      shouldAutoFocusAttack,
    }
  },
  {
    persist: true,
  }
)
