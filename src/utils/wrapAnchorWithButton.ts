export function wrapAnchorWithButton(anchor: HTMLAnchorElement): HTMLButtonElement {
  const substituteButton = document.createElement("button")
  substituteButton.setAttribute("class", anchor.getAttribute("class") || "")
  anchor.removeAttribute("class")
  substituteButton.innerText = anchor.innerText
  anchor.innerText = ""
  anchor.appendChild(substituteButton)
  return substituteButton
}
