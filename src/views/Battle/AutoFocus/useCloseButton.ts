import { wrapAnchorWithButton } from "@/utils"
import { Ref, watch } from "vue"

const isSpan = (node: Node): node is HTMLSpanElement => "innerText" in node

export function useCloseButton(shouldAutoFocusAttack: Ref<boolean>) {
  const opponentHp = document.querySelector("#opponent-hp")
  const hpObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) return
      if (!isSpan(mutation.target)) return
      if (mutation.target.innerText !== "0") return

      const closeAnchor = document.querySelector<HTMLAnchorElement>(".swal2-popup.swal2-modal.swal2-show a")
      if (!closeAnchor) return

      wrapAnchorWithButton(closeAnchor).focus()
    })
  })

  watch(
    shouldAutoFocusAttack,
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
