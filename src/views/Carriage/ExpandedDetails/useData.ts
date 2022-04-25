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

type Bests = Record<
  string,
  {
    modifiers: Array<keyof Destination["modifiers"]>
    materials: Array<keyof Destination["materials"]>
  }
>

export function useData() {
  const destinations = ref<Array<[HTMLLIElement, null | Destination]>>([])
  const bestValueLocations = ref<Bests | null>(null)

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

    const formattedData = rawData.map<[HTMLLIElement, Destination | null]>((entry) => {
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
            best: [],
          },
          materials: {
            fish: Number(data.materials.fish.chance),
            ore: Number(data.materials.ore.chance),
            treasure: Number(data.materials.treasure.chance),
            trees: Number(data.materials.trees.chance),
            best: [],
          },
        },
      ]
    })

    const bestValues = formattedData.reduce<Destination>(
      (acc, [, data]) => {
        if (!data) return acc
        const { materials, modifiers } = data

        for (const key in materials) {
          const typedKey = key as keyof Destination["materials"]
          if (acc.materials[typedKey] < materials[typedKey]) acc.materials[typedKey] = materials[typedKey]
        }

        for (const key in modifiers) {
          const typedKey = key as keyof Destination["modifiers"]
          if (acc.modifiers[typedKey] < modifiers[typedKey]) acc.modifiers[typedKey] = modifiers[typedKey]
        }

        return acc
      },
      {
        showInfo: false,
        name: "bests",
        modifiers: {
          item: 0,
          npc: 0,
          material: 0,
          travelText: 0,
        },
        materials: {
          fish: 0,
          ore: 0,
          treasure: 0,
          trees: 0,
        },
      }
    )

    const bestLocations = formattedData.reduce<Bests>((acc, [, data]) => {
      if (!data) return acc
      const { materials, modifiers } = data

      for (const key in materials) {
        const typedKey = key as keyof Destination["materials"]
        const bestValue = bestValues.materials[typedKey]

        if (data.materials[typedKey] === bestValue) {
          if (!(data.name in acc)) acc[data.name] = { modifiers: [], materials: [] }
          acc[data.name].materials.push(typedKey)
        }
      }

      for (const key in modifiers) {
        const typedKey = key as keyof Destination["modifiers"]
        const bestValue = bestValues.modifiers[typedKey]

        if (data.modifiers[typedKey] === bestValue) {
          if (!(data.name in acc)) acc[data.name] = { modifiers: [], materials: [] }
          acc[data.name].modifiers.push(typedKey)
        }
      }

      return acc
    }, {})

    destinations.value = formattedData
    bestValueLocations.value = bestLocations
  })

  return {
    destinations,
    bestValueLocations,
  }
}
