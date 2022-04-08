function isButton(element: Node): element is HTMLButtonElement {
  return "focus" in element
}

export function focusOnButtonEnable(button: HTMLButtonElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== "attributes") return
      if (mutation.attributeName !== "disabled") return
      if (!isButton(mutation.target)) return
      if (mutation.target.attributes.getNamedItem("disabled")) return

      mutation.target.focus()
    })
  })

  let isConnected = false

  return {
    connect() {
      if (isConnected) return
      isConnected = true
      button.focus()
      observer.observe(button, { attributes: true })
    },
    disconnect() {
      if (!isConnected) return
      isConnected = false
      observer.disconnect()
    },
  }
}
