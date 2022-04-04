export function focusOnButtonEnable(button: HTMLButtonElement) {
  button.focus()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "disabled") {
        if (!button.attributes.getNamedItem("disabled")) button.focus()
      }
    })
  })

  observer.observe(button, {
    attributes: true,
  })
}
