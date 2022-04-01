import { defineStore } from "pinia"
import { computed, onMounted, ref } from "vue"

export const useTravelStore = defineStore(
  "travel",
  () => {
    const cooldownTimestamp = ref<null | string>(null)

    const cooldownTimeLeft = computed(() => {
      if (!cooldownTimestamp.value) return 0
      return Math.max(new Date(cooldownTimestamp.value).valueOf() - Date.now(), 0)
    })

    onMounted(() => {
      if (!cooldownTimestamp.value) return

      setTimeout(() => {
        cooldownTimestamp.value = null
      }, cooldownTimeLeft.value)
    })

    return {
      cooldownTimestamp,
      cooldownTimeLeft,
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
