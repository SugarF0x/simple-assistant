import { defineStore } from "pinia"
import { ref } from "vue"
import { isAfter } from "date-fns"
import { createMigration } from "@/utils"

export const useFtueStore = defineStore(
  "ftue",
  () => {
    const version = ref(1)

    const isDismissed = ref(false)

    return {
      version,
      isDismissed,
    }
  },
  {
    persist: {
      serializer: {
        deserialize: (store: any) => {
          const state = migrate(JSON.parse(store))

          for (const category of Object.keys(state.resetTimestamp)) {
            const timestamp = state.resetTimestamp[category]
            if (!timestamp) continue

            if (!isAfter(new Date(), new Date(timestamp))) continue

            state.resetTimestamp[category] = null
            state.tasks[category] = []
            state.isRewardCollected[category] = false
          }

          return state
        },
        serialize: JSON.stringify,
      },
    },
  }
)

const migrate = createMigration([
  state => ({ ...state, isDismissed: false })
])
