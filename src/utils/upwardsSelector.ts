export function upwardsSelector<T extends HTMLElement>(element: HTMLElement, selector: string): T | null {
  for (; element && element !== document.body; element = element.parentNode as HTMLElement) {
    if (element.matches(selector)) return element as T
  }

  return null
}
