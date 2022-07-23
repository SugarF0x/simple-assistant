<script setup lang="ts">
import BaseItem from "./_BaseItem.vue"

import { Button } from "@/components"
import { useSafeModeStore } from "@/views/Settings/SafeMode/store"
import { storeToRefs } from "pinia"
import { addHours } from "date-fns"
import { computed } from "vue"

const safeModeStore = useSafeModeStore()
const { shouldRemindSafeMode, isSafeModeExpired, expirationTimestamp } = storeToRefs(safeModeStore)

const shouldShowSafeModeNotification = computed(() => shouldRemindSafeMode.value && isSafeModeExpired.value)
</script>

<template>
  <BaseItem
    v-if="shouldShowSafeModeNotification"
    @dismiss="expirationTimestamp = addHours(new Date(), 1).toISOString()"
  >
    <template #title> Your safe mode has expired! </template>
    <template #text>
      Enable it now!
      <br />
      Dismissing hides the notification for 1 hour
    </template>
    <template #actions>
      <Button href="/safemode"> Enable </Button>
    </template>
  </BaseItem>
</template>
