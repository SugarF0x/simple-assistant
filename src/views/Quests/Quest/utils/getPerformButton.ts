export function getPerformButton() {
  let buttons: HTMLButtonElement[] = []
  let button: null | HTMLButtonElement = null

  try {
    buttons = Array.from(document.querySelectorAll(".web-app-container .mt-4 .text-center button"))
    button = buttons.find((e) => e.tabIndex >= 0 && e.innerText.toLowerCase().includes("perform")) ?? null
  } catch (_) {
    return null
  }

  return button
}
