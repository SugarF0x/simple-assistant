<script setup lang="ts">
import { Controls } from "@/components"

import Task from "./Task.vue"
import { AutoFocus } from "./AutoFocus"

import { useBossTracker } from "./hooks"

useBossTracker()
</script>

<template>
  <Controls to=".py-6.max-w-6xl.mx-auto.px-4">
    <AutoFocus />
    <Task />
  </Controls>
</template>
