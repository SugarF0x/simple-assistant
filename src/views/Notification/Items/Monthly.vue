<script setup lang="ts">
import BaseItem from "./BaseItem.vue"

import { Button } from "@/components"
import { storeToRefs } from "pinia"
import { useMaholMonthlyStore } from "@/views/Mahol/Monthly/store"

const maholMonthlyStore = useMaholMonthlyStore()
const { isMonthlyRewardReady, lastRewardClaimTimestamp } = storeToRefs(maholMonthlyStore)
</script>

<template>
  <BaseItem v-if="isMonthlyRewardReady" @dismiss="lastRewardClaimTimestamp = new Date().toISOString()">
    <template #title> Monthly reward available! </template>
    <template #text> Claim your monthly reward now! </template>
    <template #actions>
      <Button href="/monthlyreward"> Claim </Button>
    </template>
  </BaseItem>
</template>
