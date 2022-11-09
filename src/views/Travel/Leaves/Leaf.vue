<script setup lang="ts">
import leaf1 from "@/assets/svgs/leaf-1.svg"
import leaf2 from "@/assets/svgs/leaf-2.svg"
import leaf3 from "@/assets/svgs/leaf-3.svg"
import leaf4 from "@/assets/svgs/leaf-4.svg"

const leaves = [leaf1, leaf2, leaf3, leaf4].map((e) => chrome.runtime.getURL(e))

const index = Math.floor(Math.random() * leaves.length)
</script>

<template>
  <img :src="leaves[index % leaves.length]" :alt="`leaf-${index}`" class="leaf" />
</template>

<style lang="scss" scoped>
.leaf {
  width: 24px;
  height: 24px;
}
</style>
