<script setup lang="ts">
import BaseItem from "./BaseItem.vue"

import { Button } from "@/components"
import { useMaholDailyStore } from "@/views/Mahol/Daily/store"
import { storeToRefs } from "pinia"

const maholDailyStore = useMaholDailyStore()
const { isDailyNotificationRequired } = storeToRefs(maholDailyStore)
</script>

<template>
  <BaseItem v-if="isDailyNotificationRequired">
    <template #title> Daily reward available! </template>
    <template #text> Claim your daily reward now! </template>
    <template #actions>
      <Button href="/dailyreward"> Claim </Button>
    </template>
  </BaseItem>
</template>
