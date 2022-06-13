import { Ref, watch } from "vue"

const isSpan = (node: Node): node is HTMLSpanElement => "innerText" in node

export function useHealthObserver(toggle: Ref<boolean>, callback: () => void) {
  const opponentHp = document.querySelector("#opponent-hp")
  const hpObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) return
      if (!isSpan(mutation.target)) return
      if (mutation.target.innerText !== "0") return

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
