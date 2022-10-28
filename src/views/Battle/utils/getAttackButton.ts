export function getAttackButton() {
  let buttons: HTMLButtonElement[] = []
  let button: null | HTMLButtonElement = null

  try {
    buttons = Array.from(document.querySelectorAll(".rounded-lg.h-96 button"))
    button = buttons.find((e) => e.tabIndex >= 0 && e.innerText.toLowerCase().includes("attack")) ?? null
  } catch (_) {
    return null
  }

  return button
}
