<script setup lang="ts">
import BaseItem from "./BaseItem.vue"

import { Button } from "@/components"
import { useSafeModeStore } from "@/views/Settings/SafeMode/store"
import { storeToRefs } from "pinia"

const safeModeStore = useSafeModeStore()
const { isSafeModeNotificationRequired, lastSafeModeActivationTime } = storeToRefs(safeModeStore)
</script>

<template>
  <BaseItem v-if="isSafeModeNotificationRequired" @dismiss="lastSafeModeActivationTime = new Date().toISOString()">
    <template #title> Your safe mode has expired! </template>
    <template #text> Enable it now! </template>
    <template #actions>
      <Button href="/safemode"> Enable </Button>
    </template>
  </BaseItem>
</template>
