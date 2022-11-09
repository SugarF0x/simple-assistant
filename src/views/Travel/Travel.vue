<script setup lang="ts">
import { Controls } from "@/components"

import DataBridge from "./DataBridge.vue"
import Task from "./Task.vue"
import Leaves from "./Leaves"
import { AutoFocus } from "./AutoFocus"
</script>

<template>
  <Controls to="#complete-travel-container">
    <DataBridge />
    <AutoFocus />
    <Task />
    <Leaves />
  </Controls>
</template>
