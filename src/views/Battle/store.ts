import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { getTimeWithLondonOffset, getLondonTime } from "@/utils"
import { MS_IN_DAY } from "@/consts"

export const useBattleStore = defineStore(
  "battle",
  () => {
    const shouldDisableSpecial = ref(false)
    const shouldAutoFocusAttack = ref(false)
    const shouldAutoFocusItem = ref(false)

    const carrotCapacityDepletionTime = ref<null | string>(null)
    const isMushroomQuotaDepleted = computed(() => {
      if (!carrotCapacityDepletionTime.value) return false

      return (
        getLondonTime().valueOf() -
          MS_IN_DAY / 2 -
          getTimeWithLondonOffset(new Date(carrotCapacityDepletionTime.value)).valueOf() <=
        MS_IN_DAY
      )
    })

    return {
      shouldDisableSpecial,
      shouldAutoFocusAttack,
      shouldAutoFocusItem,
      carrotCapacityDepletionTime,
      isMushroomQuotaDepleted,
    }
  },
  {
    persist: true,
  }
)
