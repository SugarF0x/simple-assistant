import { ref, Ref, watchEffect } from "vue"

export interface UseSwalObserverOptions {
  toggle?: Ref<boolean>
  onResolve?: (element: HTMLDivElement) => void
  onReject?: (element: HTMLDivElement) => void
  onOpen?: (element: HTMLDivElement) => void
  onClose?: () => void
}

export function useSwalObserver(options: UseSwalObserverOptions) {
  const { toggle = ref(true), onResolve, onOpen, onClose, onReject } = options

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) {
        const nodes = Array.from(mutation.removedNodes) as HTMLElement[]
        if (nodes.some((el) => el.classList?.contains("swal2-container"))) onClose?.()
      }
      if (mutation.removedNodes.length) return

      const swalContainer = (Array.from(mutation.addedNodes) as HTMLDivElement[]).find((e) =>
        e.classList?.contains("swal2-container")
      )
      if (!swalContainer) return

      onOpen?.(swalContainer)
      if (swalContainer.querySelector('.swal2-success[style="display: flex;"]')) onResolve?.(swalContainer)
      else if (swalContainer.querySelector('.swal2-error[style="display: flex;"]')) onReject?.(swalContainer)
    })
  })

  watchEffect(() => {
    if (toggle.value) observer.observe(document.body, { childList: true })
    else observer.disconnect()
  })
}
