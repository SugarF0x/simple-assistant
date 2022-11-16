export async function getResetTimeString(): Promise<string> {
  const countdownElement = document.querySelector("#countdown")
  if (!countdownElement) throw new Error("Could not locate countdown element")

  return new Promise<string>((resolve) => {
    const countdownObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.removedNodes.length || !mutation.addedNodes.length) return
        if (!mutation.addedNodes[0].nodeValue) return

        countdownObserver.disconnect()
        resolve(mutation.addedNodes[0].nodeValue)
      })
    })

    countdownObserver.observe(countdownElement, { childList: true })
  })
}
