<script setup lang="ts">
import { Card } from "@/components"
import { storeToRefs } from "pinia"
import { useGeneralStore } from "@/views/General/store"

const { shouldDisableSwalGloom } = storeToRefs(useGeneralStore())
</script>

<template>
  <Teleport to="body">
    <div class="wrapper" :class="{ gloom: shouldDisableSwalGloom }">
      <div class="scroller">
        <Card outline class="card">
          <slot />
        </Card>
      </div>
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
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  &.gloom {
    background-color: transparent;
    backdrop-filter: blur(2px);
  }
}

.scroller {
  display: flex;
  flex-direction: column;

  padding: 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  margin: auto;
  max-width: 767px;
}
</style>
