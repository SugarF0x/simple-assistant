export function getBossElements() {
  const firstElement = document.querySelector<HTMLDivElement>(".web-app-container .w-full div .items-center")
  const otherElementsWrapper = document.querySelector<HTMLDivElement>(".web-app-container .w-full ~ div .divide-y")
  const otherElements = Array.from(otherElementsWrapper?.children ?? []) as HTMLDivElement[]

  if (!firstElement) return []
  return [firstElement, ...otherElements]
}
