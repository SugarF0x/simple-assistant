<script setup lang="ts">
import leaf1 from "@/assets/svgs/leaf-1.svg"
import leaf2 from "@/assets/svgs/leaf-2.svg"
import leaf3 from "@/assets/svgs/leaf-3.svg"
import leaf4 from "@/assets/svgs/leaf-4.svg"

const leaves = [leaf1, leaf2, leaf3, leaf4].map((e) => chrome.runtime.getURL(e))

const index = Math.floor(Math.random() * leaves.length)

const startX = Math.floor(Math.random() * 100) + "%"
const startY = Math.floor(Math.random() * 100) + "%"
const startSize = Math.floor(Math.random() * 5) / 10 + 0.5
const startRotation = Math.floor(Math.random() * 360) + "deg"
</script>

<template>
  <img :src="leaves[index % leaves.length]" :alt="`leaf-${index}`" class="leaf" />
</template>

<style lang="scss" scoped>
.leaf {
  position: absolute;
  top: v-bind(startX);
  left: v-bind(startY);
  transform: scale(v-bind(startSize)) rotate(v-bind(startRotation));
  width: 32px;
  height: 32px;
}
</style>
