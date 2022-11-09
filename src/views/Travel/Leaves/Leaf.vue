<script setup lang="ts">
import leaf1 from "@/assets/svgs/leaf-1.svg"
import leaf2 from "@/assets/svgs/leaf-2.svg"
import leaf3 from "@/assets/svgs/leaf-3.svg"
import leaf4 from "@/assets/svgs/leaf-4.svg"

const leaves = [leaf1, leaf2, leaf3, leaf4].map((e) => chrome.runtime.getURL(e))

const index = Math.floor(Math.random() * leaves.length)

const startX = Math.floor(Math.random() * 100) + "%"
const startSize = Math.floor(Math.random() * 5) / 10 + 0.5
const startRotation = Math.floor(Math.random() * 360) + "deg"
const startDelay = Math.floor(Math.random() * 50) / 10 + "s"

const travelSpeed = Math.floor(Math.random() * 10) + 5 + "s"
</script>

<template>
  <img :src="leaves[index % leaves.length]" :alt="`leaf-${index}`" class="leaf" />
</template>

<style lang="scss" scoped>
.leaf {
  position: absolute;
  top: -25%;
  left: v-bind(startX);

  width: 32px;
  height: 32px;
  transform: scale(v-bind(startSize)) rotate(v-bind(startRotation));

  animation: v-bind(travelSpeed) linear v-bind(startDelay) infinite leaf-fall;
}

@keyframes leaf-fall {
  from {
    top: -25%;
  }
  to {
    top: 125%;
  }
}
</style>
