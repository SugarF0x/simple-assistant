export function wrapAnchorWithButton(anchor: HTMLAnchorElement): HTMLButtonElement {
  const substituteButton = document.createElement("button")
  substituteButton.setAttribute("class", anchor.getAttribute("class") || "")
  anchor.removeAttribute("class")
  const html = anchor.innerHTML
  anchor.innerHTML = ""
  anchor.tabIndex = -1
  substituteButton.innerHTML = html
  anchor.appendChild(substituteButton)
  return substituteButton
}
