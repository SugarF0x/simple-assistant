import { Boss } from "../../store"
import { add, setSeconds, setMilliseconds } from "date-fns"

export function parseBossElements(elements: HTMLDivElement[]) {
  return elements.reduce<Boss[]>((acc, val) => {
    const [name, levelText, time] = val.innerText.split("\n").filter(Boolean)

    const level = parseInt(levelText.replace(/[a-z]/gi, ""))
    if (!level) throw new Error("Unable to parse level")

    const [days, hours, minutes] = time.split(",").map((e) => parseInt(e))
    const flatTime = setSeconds(setMilliseconds(new Date(), 0), 0)
    let timestamp
    try {
      timestamp = add(flatTime, { days, hours, minutes })
    } catch (e) {
      throw new Error("Unable to parse timestamp")
    }

    const anchor = val.querySelector("a")
    const onClick = val.getAttribute("onclick") ?? ""
    const href = anchor?.getAttribute("href") ?? onClick.slice(onClick.indexOf("location") + "location".length + 2, -2)
    if (!href) throw new Error("Unable to parse href")

    const imgElement = val.querySelector("img")
    const img = imgElement?.getAttribute("src")
    if (!img) throw new Error("Unable to parse image source")

    const id = parseInt(href.replaceAll(/[a-z/?_=]/gi, ""))
    if (isNaN(id)) throw new Error("Unable to parse ID")

    const origin = window.location.origin

    acc.push({
      name,
      id,
      level,
      img: origin + img,
      href: origin + href.replace(/view/gi, "attack").replace(/\?new_page=true/, ""),
      timestamp: timestamp.toISOString(),
      isDead: false,
    })
    return acc
  }, [])
}
