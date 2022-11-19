export function getQuestListElement(): HTMLUListElement {
  const questListElement = document.querySelector<HTMLUListElement>("ul[role=list]")
  if (!questListElement) throw new Error("Could not locale quest list element")
  return questListElement
}
