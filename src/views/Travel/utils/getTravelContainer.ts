export function getTravelContainer(): HTMLDivElement {
  const travelContainer = Array.from(document.querySelectorAll("#complete-travel-container > div"))[1]
  if (!travelContainer) throw new Error('Could not locate travel window')
  return travelContainer as HTMLDivElement
}
