<script lang="ts" setup>
import Shortcuts from "./Shortcuts.vue"

import { Controls } from "@/components"
import { onBeforeMount, ref } from "vue"

const isVerificationRequired = ref(false)

onBeforeMount(() => {
  isVerificationRequired.value = !document
    .querySelector<HTMLDivElement>(".rounded-md.bg-green-50.p-4")
    ?.innerText.includes("passed")
})
</script>

<template>
  <Controls v-if="isVerificationRequired" to="#threat-level">
    <Shortcuts />
  </Controls>
</template>
