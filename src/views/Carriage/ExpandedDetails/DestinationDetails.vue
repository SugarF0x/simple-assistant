<script setup lang="ts">
defineProps<{
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
}>()
</script>

<template>
  <div class="wrapper mt-3">
    <div class="modifiers">
      <div>Item: {{ modifiers.item }}%</div>
      <div>NPC: {{ modifiers.npc }}%</div>
      <div>Material: {{ modifiers.material }}%</div>
      <div>Text: {{ modifiers.travelText }}%</div>
    </div>
    <div class="materials">
      <div>Trees: {{ materials.trees }}%</div>
      <div>Ore: {{ materials.ore }}%</div>
      <div>Fish: {{ materials.fish }}%</div>
      <div>Treasure: {{ materials.treasure }}%</div>
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
</style>
