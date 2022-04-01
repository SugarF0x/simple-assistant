import { onMounted } from "vue"
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"

export function useTravelButton() {
  const travelStore = useTravelStore()
  const { cooldownTimeLeft } = storeToRefs(travelStore)

  const travelButton = document.querySelector<HTMLButtonElement>(".px-4.py-4 button")

  onMounted(() => {
    if (!travelButton) return
    if (!cooldownTimeLeft.value) return
    travelButton.disabled = true

    setTimeout(() => {
      travelButton.disabled = false
    }, cooldownTimeLeft.value)
  })
}
