import { createMigration } from "@/utils"
import { isAfter } from "date-fns"

export const persist = {
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
}

const migrate = createMigration([
  (state) => {
    delete state.tasks
    delete state.lastUpdateTimestamp
    delete state.isRewardCollected

    return state
  },
])
