<script setup lang="ts">
interface Modifiers {
  item: number
  npc: number
  material: number
  travelText: number
}

interface Materials {
  fish: number
  ore: number
  treasure: number
  trees: number
}

defineProps<{
  modifiers: Modifiers
  materials: Materials
  bests?: {
    modifiers: Array<keyof Modifiers>
    materials: Array<keyof Materials>
  }
  highlight?: boolean
}>()
</script>

<template>
  <div class="wrapper mt-3" :class="{ highlight: highlight }">
    <div class="modifiers">
      <div class="stat" :class="{ best: bests?.modifiers.includes('item') }">Item: {{ modifiers.item }}%</div>
      <div class="stat" :class="{ best: bests?.modifiers.includes('npc') }">NPC: {{ modifiers.npc }}%</div>
      <div class="stat" :class="{ best: bests?.modifiers.includes('material') }">
        Material: {{ modifiers.material }}%
      </div>
      <div class="stat" :class="{ best: bests?.modifiers.includes('travelText') }">
        Text: {{ modifiers.travelText }}%
      </div>
    </div>
    <div class="materials">
      <div class="stat" :class="{ best: bests?.materials.includes('trees') }">Trees: {{ materials.trees }}%</div>
      <div class="stat" :class="{ best: bests?.materials.includes('ore') }">Ore: {{ materials.ore }}%</div>
      <div class="stat" :class="{ best: bests?.materials.includes('fish') }">Fish: {{ materials.fish }}%</div>
      <div class="stat" :class="{ best: bests?.materials.includes('treasure') }">
        Treasure: {{ materials.treasure }}%
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  font-size: 0.85em;
}

.modifiers {
  text-align: left;
}

.materials {
  text-align: right;
}

.highlight {
  .stat:not(.best) {
    color: red;
  }

  .best {
    color: green;
  }
}
</style>
