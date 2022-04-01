import { defineStore } from "pinia"
import { onMounted, ref } from "vue"

export const useTravelStore = defineStore(
  "travel",
  () => {
    const cooldownTimestamp = ref<null | string>(null)

    onMounted(() => {
      if (!cooldownTimestamp.value) return

      setTimeout(() => {
        cooldownTimestamp.value = null
      }, new Date(cooldownTimestamp.value).valueOf() - Date.now())
    })

    return {
      cooldownTimestamp,
    }
  },
  {
    persist: {
      serializer: {
        deserialize: (store) => {
          const parsed = JSON.parse(store)
          const date = new Date(parsed.cooldownTimestamp)
          if (date.valueOf() < Date.now()) parsed.cooldownTimestamp = null
          return parsed
        },
        serialize: JSON.stringify,
      },
    },
  }
)
