export function getCardText(el: HTMLElement): string {
  const onclickData = el.getAttribute("onclick")
  if (!onclickData) return "No meta found"

  const meta = onclickData.slice(onclickData.indexOf("('")).replace(/[)(]/g, "")
  const parsedMeta = JSON.parse(`[${meta.replace(/"/g, '\\"').replace(/'/g, '"')}]`)
  return parsedMeta[1]
}
