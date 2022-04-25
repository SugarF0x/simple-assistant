import { onMounted, ref } from "vue"
import { unflatten } from "flat"

interface DestinationRawData {
  showInfo: string
  name: string
  modifiers: {
    item: string
    npc: string
    material: string
    travelText: string
  }
  materials: {
    fish: {
      chance: string
    }
    ore: {
      chance: string
    }
    treasure: {
      chance: string
    }
    trees: {
      chance: string
    }
  }
}

interface Destination {
  showInfo: boolean
  name: string
  modifiers: {
    item: number
    npc: number
    material: number
    travelText: number
  }
  materials: {
    fish: number
    ore: number
    treasure: number
    trees: number
  }
}

export function useData() {
  const destinations = ref<Array<[HTMLLIElement, null | Destination]>>([])

  onMounted(() => {
    const appContainer = document.querySelector(".web-app-container")
    if (!appContainer) return

    const cards = Array.from(appContainer.querySelectorAll("li")).filter((button) => button.childElementCount > 1)

    const rawData = cards.map<[HTMLLIElement, DestinationRawData | null]>((card) => {
      const button = card.querySelector("button")
      if (!button) return [card, null]

      const extractedEntries = button
        .getAttribute("x-on:click")
        ?.split(";")
        .slice(0, -1)
        .map((a) => a.split("="))
      return [card, extractedEntries ? unflatten(Object.fromEntries(extractedEntries)) : null]
    })

    destinations.value = rawData.map<[HTMLLIElement, Destination | null]>((entry) => {
      const [button, data] = entry
      if (!data) return [button, null]

      const item = Number(data.modifiers.item)
      const npc = Number(data.modifiers.npc)
      const material = Number(data.modifiers.material)
      const travelText = 100 - item - npc - material

      return [
        button,
        {
          showInfo: data.showInfo === "true",
          name: data.name.replaceAll(`'`, "").replaceAll(" ", "-"),
          modifiers: {
            item,
            npc,
            material,
            travelText,
          },
          materials: {
            fish: Number(data.materials.fish.chance),
            ore: Number(data.materials.ore.chance),
            treasure: Number(data.materials.treasure.chance),
            trees: Number(data.materials.trees.chance),
          },
        },
      ]
    })
  })

  return destinations
}
