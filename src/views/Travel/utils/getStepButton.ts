export function getStepButton() {
  let buttons: HTMLButtonElement[] = []
  let button: null | HTMLButtonElement = null

  try {
    buttons = Array.from(document.querySelectorAll(".relative.mt-2.rounded-lg")[1].querySelectorAll("button"))
    button = buttons.find((e) => e.tabIndex >= 0 && e.innerText.toLowerCase().includes("step")) ?? null
  } catch (_) {
    return null
  }

  return button
}
