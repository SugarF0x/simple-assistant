export function getAttackButton() {
  let buttons: HTMLButtonElement[] = []
  let button: null | HTMLButtonElement = null

  try {
    buttons = Array.from(document.querySelectorAll(".relative.z-0.inline-flex.shadow-sm.rounded-lg button"))
    button = buttons.find((e) => e.tabIndex >= 0 && e.innerText.toLowerCase().includes("attack")) ?? null
  } catch (_) {
    return null
  }

  return button
}
