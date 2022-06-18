export interface UseSwalObserverOptions {
  onResolve?: () => void
  onReject?: () => void
  onOpen?: () => void
  onClose?: () => void
}

export function useSwalObserver(options: UseSwalObserverOptions) {
  const { onResolve, onOpen, onClose, onReject } = options

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) {
        const nodes = Array.from(mutation.removedNodes) as HTMLElement[]
        if (nodes.some((el) => el.classList?.contains("swal2-container"))) onClose?.()
      }
      if (mutation.removedNodes.length) return

      const swalContainer = (Array.from(mutation.addedNodes) as HTMLDivElement[]).find((e) =>
        e.classList.contains("swal2-container")
      )
      if (!swalContainer) return

      onOpen?.()
      if (swalContainer.querySelector('.swal2-success[style="display: flex;"]')) onResolve?.()
      else if (swalContainer.querySelector('.swal2-error[style="display: flex;"]')) onReject?.()
    })
  })

  observer.observe(document.body, { childList: true })
}
