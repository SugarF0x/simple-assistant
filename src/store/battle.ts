import { defineStore } from "pinia"
import { ref } from "vue"

export const useBattleStore = defineStore(
  "battle",
  () => {
    const isSpecialDisabled = ref(false)

    return {
      isSpecialDisabled,
    }
  },
  {
    persist: true,
  }
)
