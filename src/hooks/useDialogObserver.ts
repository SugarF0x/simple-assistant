export interface DialogObserverOptions {
  onOpen?: (el: HTMLDivElement) => void
  onClose?: (el: HTMLDivElement) => void
}

export function useDialogObserver(options: DialogObserverOptions = {}) {
  const { onOpen, onClose } = options

  const modals = Array.from(document.querySelectorAll("div[role=dialog]"))

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "attributes") return
      if (mutation.attributeName !== "style") return

      const element = mutation.target as HTMLDivElement
      const isShown = !element.style.display

      if (isShown) onOpen?.(element)
      else onClose?.(element)
    })
  })

  modals.forEach((modal) => observer.observe(modal, { attributes: true }))
}
