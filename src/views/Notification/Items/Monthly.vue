<script setup lang="ts">
import BaseItem from "./_BaseItem.vue"

import { Button } from "@/components"
import { storeToRefs } from "pinia"
import { useMaholMonthlyStore } from "@/views/Mahol/Monthly/store"

const maholMonthlyStore = useMaholMonthlyStore()
const { shouldShowMonthlyRewardNotification, lastRewardClaimTimestamp } = storeToRefs(maholMonthlyStore)
</script>

<template>
  <BaseItem v-if="shouldShowMonthlyRewardNotification" @dismiss="lastRewardClaimTimestamp = new Date().toISOString()">
    <template #title> Monthly reward available! </template>
    <template #text> Claim your monthly reward now! </template>
    <template #actions>
      <Button href="/monthlyreward"> Claim </Button>
    </template>
  </BaseItem>
</template>
