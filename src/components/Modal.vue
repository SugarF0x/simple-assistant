<script setup lang="ts">
import { Card } from "@/components"
import { storeToRefs } from "pinia"
import { useGeneralStore } from "@/views/General/store"

defineProps<{
  open?: boolean
}>()

const { shouldDisableSwalGloom } = storeToRefs(useGeneralStore())
</script>

<template>
  <Teleport to="body" v-if="open">
    <div class="wrapper" :class="{ gloom: shouldDisableSwalGloom }">
      <Card outline class="card">
        <slot />
      </Card>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  &.gloom {
    background-color: transparent;
    backdrop-filter: blur(2px);
  }
}
</style>
