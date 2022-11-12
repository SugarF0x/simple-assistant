export type ControlsSlotType = "before" | "after"

export function createControlsSlot(type: ControlsSlotType = "after", target?: Element): HTMLDivElement | null {
  if (!target) return null

  const controlsSlot = document.createElement("div")
  controlsSlot.id = "sa-controls"

  switch (type) {
    case "before":
      target.prepend(controlsSlot)
      break
    case "after":
      target.append(controlsSlot)
      break
  }

  return controlsSlot
}
