import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useArenaStore = defineStore(
  "arena",
  () => {
    const shouldAutoFocusGenerate = ref(false)
    const shouldTrackBosses = ref(false)
    const shouldNotifyOfBosses = ref(false)
    const shouldNotifyOfAllBosses = ref(false)

    const bossesToRemindOf = reactive([])

    return {
      shouldAutoFocusGenerate,
      shouldTrackBosses,
      shouldNotifyOfBosses,
      shouldNotifyOfAllBosses,
      bossesToRemindOf,
    }
  },
  {
    persist: true,
  }
)
