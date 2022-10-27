export function getBackgroundImageUrl() {
  const element = document.querySelector<HTMLDivElement>(".rounded-lg.h-96")
  if (!element) throw new Error("Could not locate battle background image element")
  const urlStyle = element.style.backgroundImage
  if (!urlStyle) throw new Error("No background image style found on image element")
  const url = (urlStyle.match(/"(.*?)"/g) ?? [])[0]
  if (!url) throw new Error("Unable to parse background style content")
  return url.replace(/"/g, "")
}
