<script setup lang="ts">
import BaseItem from "./_BaseItem.vue"
import { Button } from "@/components"
import { useArenaStore } from "../../Arena/store"
import { storeToRefs } from "pinia"

const { areNewBossesAvailable, refreshTimestamp } = storeToRefs(useArenaStore())
</script>

<template>
  <BaseItem v-if="areNewBossesAvailable" @dismiss="refreshTimestamp = new Date().toISOString()">
    <template #title> New bosses have emerged! </template>
    <template #text> Go check them out! </template>
    <template #actions>
      <Button href="/battle/world-bosses"> To boss list </Button>
    </template>
  </BaseItem>
</template>
