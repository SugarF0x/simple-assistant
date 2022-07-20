<script setup lang="ts">
import AutoFocus from "./AutoFocus.vue"
import Notification from "./Notification.vue"

import { Controls } from "@/components"
</script>

<template>
  <Controls to=".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden">
    <AutoFocus />
    <Notification />
  </Controls>
</template>
