<script setup lang="ts">
import { Controls } from "@/components"

import Task from "./Task.vue"
import { AutoFocus } from "./AutoFocus"

import { useBossTracker } from "./hooks"

useBossTracker()
</script>

<template>
  <Controls to=".bg-white.mt-4.rounded-md.p-8.text-center">
    <AutoFocus />
    <Task />
  </Controls>
</template>
