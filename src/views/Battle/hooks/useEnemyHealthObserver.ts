import { Ref, watch } from "vue"

export function useHealthObserver(toggle: Ref<boolean>, callback: () => void) {
  const opponentHp = document.querySelectorAll(".rounded-lg.h-96 .flex.justify-center.bg-gradient-to-r")[1]
  const hpObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if ((mutation.target as HTMLDivElement).innerText !== "") return

      callback()
    })
  })

  watch(
    toggle,
    (val) => {
      if (!opponentHp) return

      if (val) hpObserver.observe(opponentHp, { childList: true })
      else hpObserver.disconnect()
    },
    {
      immediate: true,
    }
  )
}
