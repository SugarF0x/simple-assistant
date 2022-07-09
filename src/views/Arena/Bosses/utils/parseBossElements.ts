import { Boss } from "../../store"
import { addDays, addHours, addMinutes, setSeconds, setMilliseconds } from "date-fns"

export function parseBossElements(elements: HTMLDivElement[]) {
  return elements.reduce<Boss[]>((acc, val) => {
    const [name, levelText, time] = val.innerText.split("\n").filter(Boolean)

    const level = parseInt(levelText.replace(/[a-z]/gi, ""))
    if (!level) throw new Error("Unable to parse level")

    const [days, hours, minutes] = time.split(",").map((e) => parseInt(e))
    const timestamp = addDays(
      addHours(addMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), minutes + 1), hours),
      days
    )
    if (isNaN(timestamp as any)) throw new Error("Unable to parse timestamp")

    const anchor = val.querySelector("a")
    const onClick = val.getAttribute("onclick") ?? ""
    const href = anchor?.getAttribute("href") ?? onClick.slice(onClick.indexOf("location") + "location".length + 2, -2)
    if (!href) throw new Error("Unable to parse href")

    const imgElement = val.querySelector("img")
    const img = imgElement?.getAttribute("src")
    if (!img) throw new Error("Unable to parse image source")

    acc.push({
      name,
      level,
      href,
      img,
      timestamp: timestamp.toISOString(),
    })
    return acc
  }, [])
}
