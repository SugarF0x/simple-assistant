<script lang="ts" setup>
import Shortcuts from "./Shortcuts.vue"

import { Controls } from "@/components"
import { onMounted, ref } from "vue"

const isVerificationRequired = ref(false)

onMounted(() => {
  isVerificationRequired.value = !document
    .querySelector<HTMLDivElement>(".rounded-md.bg-green-50.p-4")
    ?.innerText.includes("passed")
})
</script>

<template>
  <Controls v-if="isVerificationRequired" to=".py-6.max-w-7xl.mx-auto.px-4">
    <Shortcuts />
  </Controls>
</template>
