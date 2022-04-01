import { onMounted, ref, watch } from "vue"
import { useTravelStore } from "@/store"
import { storeToRefs } from "pinia"
import { useTransition, TransitionPresets } from "@vueuse/core"

export function useTravelBar() {
  const travelStore = useTravelStore()
  const { cooldownTimeLeft } = storeToRefs(travelStore)

  const travelBarContainer = document.querySelector<HTMLDivElement>("#travelBarContainer")
  const travelBar = document.querySelector<HTMLDivElement>("#myBar")

  const width = ref(0)
  const output = useTransition(width, {
    duration: cooldownTimeLeft.value,
    transition: TransitionPresets.easeInOutCubic,
    onFinished() {
      travelBarContainer!.style.display = "none"
      setTimeout(() => {
        travelBar!.style.width = "0%"
      })
    },
  })

  watch(output, (val) => {
    travelBar!.style.width = `${val.toFixed(2)}%`
  })

  onMounted(() => {
    if (!travelBarContainer) return
    if (!travelBar) return
    if (!cooldownTimeLeft.value) return

    travelBarContainer!.style.display = "inherit"
    width.value = 100
  })
}
