export function wrapQuestLiWithButton(li: HTMLUListElement): HTMLButtonElement {
  const button = document.createElement("button")

  button.innerHTML = li.innerHTML
  li.innerHTML = ""

  button.setAttribute("class", li.getAttribute("class") ?? "")
  li.removeAttribute("class")
  button.setAttribute("style", "width: 100%; text-align: left;")

  button.setAttribute("onclick", String(li.getAttribute("onclick")))
  li.removeAttribute("onclick")

  li.appendChild(button)
  return button
}
