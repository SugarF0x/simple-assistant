<script setup lang="ts">
import { Controls } from "@/components"

import SpecialAttackLock from "./SpecialAttackLock.vue"
import AutoFocus from "./AutoFocus.vue"
</script>

<template>
  <Controls to=".bg-white.mt-4.rounded-md.p-8.text-center">
    <AutoFocus />
    <SpecialAttackLock />
  </Controls>
</template>
