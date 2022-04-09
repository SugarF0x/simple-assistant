<script setup lang="ts">
import BaseItem from "./BaseItem.vue"

import { Button } from "@/components"
</script>

<template>
  <BaseItem>
    <template #title>Daily reward available!</template>
    <template #text>Claim your daily reward now!</template>
    <template #actions>
      <Button href="/dailyreward">Claim</Button>
    </template>
  </BaseItem>
</template>
