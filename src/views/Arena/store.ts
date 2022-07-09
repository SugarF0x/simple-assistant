import { defineStore } from "pinia"
import { ref } from "vue"

export const useArenaStore = defineStore(
  "arena",
  () => {
    const shouldAutoFocusGenerate = ref(false)
    const shouldTrackBosses = ref(false)
    const shouldNotifyOfBosses = ref(false)

    const bossList = ref<Boss[]>([])

    return {
      shouldAutoFocusGenerate,
      shouldTrackBosses,
      shouldNotifyOfBosses,
      bossList,
    }
  },
  {
    persist: true,
  }
)

export interface Boss {
  name: string
  level: number
  timestamp: string
  href: string
  img: string
}
