<script setup lang="ts">
import Incomplete from "./Incomplete.vue"
import AutoFocus from "./AutoFocus.vue"

import { Controls } from "@/components"
</script>

<template>
  <Controls to=".text-center.rounded-lg.backdrop-blur-md" style="color: white">
    <Incomplete />
    <AutoFocus />
  </Controls>
</template>
