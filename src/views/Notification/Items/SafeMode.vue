<script setup lang="ts">
import BaseItem from "./BaseItem.vue"

import { Button } from "@/components"
</script>

<template>
  <BaseItem>
    <template #title> Your safe mode has expired! </template>
    <template #text> Enable it now! </template>
    <template #actions>
      <Button href="/safemode"> Enable </Button>
    </template>
  </BaseItem>
</template>
