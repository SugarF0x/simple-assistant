import { defineStore } from "pinia"
import { ref } from "vue"
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
          return migrate(JSON.parse(store))
        },
        serialize: JSON.stringify,
      },
    },
  }
)

const migrate = createMigration([
  state => ({ ...state, isDismissed: false })
])
