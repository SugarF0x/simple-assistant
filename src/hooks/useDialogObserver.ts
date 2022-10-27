import { ref, Ref, watchEffect } from "vue"

export interface DialogObserverOptions {
  toggle?: Ref<boolean>
  onOpen?: (el: DialogObserverResponse) => void
  onClose?: (el: DialogObserverResponse) => void
}

export interface DialogObserverResponse {
  el: HTMLDivElement
  title: string
}

export function useDialogObserver(options: DialogObserverOptions = {}) {
  const { toggle = ref(true), onOpen, onClose } = options

  const modals = Array.from(document.querySelectorAll("div[role=dialog]"))

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "attributes") return
      if (mutation.attributeName !== "style") return

      const wrapper = mutation.target as HTMLDivElement
      const isShown = !wrapper.style.display

      const cardElement = wrapper.querySelector<HTMLDivElement>("div.relative")
      if (!cardElement) return

      const result: DialogObserverResponse = {
        el: cardElement,
        title: cardElement.querySelector("h3")?.innerText ?? "",
      }

      if (isShown) onOpen?.(result)
      else onClose?.(result)
    })
  })

  watchEffect(() => {
    if (toggle.value) modals.forEach((modal) => observer.observe(modal, { attributes: true }))
    else observer.disconnect()
  })
}
