import { defineStore } from "pinia"
import { ref } from "vue"

export const useBattleStore = defineStore(
  "battle",
  () => {
    const shouldDisableSpecial = ref(false)

    return {
      shouldDisableSpecial,
    }
  },
  {
    persist: true,
  }
)
