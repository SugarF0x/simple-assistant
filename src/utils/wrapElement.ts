export function wrapElement(element: HTMLElement, id: string) {
  if (!element.parentNode) return

  const wrapper = document.createElement("div")
  wrapper.id = id

  element.parentNode.appendChild(wrapper)
  return wrapper.appendChild(element)
}
