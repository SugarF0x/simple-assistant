export type ControlsSlotType = "before" | "after"

export const SA_CONTROLS_ID = "sa-controls"

export function createControlsSlot(target: Element | null, type: ControlsSlotType = "after"): HTMLDivElement | null {
  if (!target) return null

  const controlsSlot = document.createElement("div")
  controlsSlot.id = SA_CONTROLS_ID

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
