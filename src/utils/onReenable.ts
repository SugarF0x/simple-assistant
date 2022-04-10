function isButton(element: Node): element is HTMLButtonElement {
  return "focus" in element
}

export function onReenable(element: HTMLElement, callback: () => void, once = true) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "attributes") return
      if (mutation.attributeName !== "disabled") return
      if (!isButton(mutation.target)) return
      if (mutation.target.attributes.getNamedItem("disabled")) return

      if (once) observer.disconnect()
      callback()
    })
  })

  observer.observe(element, { attributes: true })
}
