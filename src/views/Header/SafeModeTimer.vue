<script setup lang="ts">
import { useSafeModeStore } from "../Settings/SafeMode/store"
import { storeToRefs } from "pinia"
import { onBeforeMount, ref } from "vue"
import { formatDistance, isAfter } from "date-fns"

const { expirationTimestamp, shouldDisplayRemainingTimeInHeader, shouldRemindSafeMode } = storeToRefs(
  useSafeModeStore()
)

const formattedTimeRemaining = ref("")

function getFormattedTimeRemaining() {
  if (isAfter(new Date(), new Date(expirationTimestamp.value))) formattedTimeRemaining.value = ""
  else formattedTimeRemaining.value = formatDistance(new Date(), new Date(expirationTimestamp.value))
}

onBeforeMount(() => {
  getFormattedTimeRemaining()
  setInterval(() => {
    getFormattedTimeRemaining()
  }, 1000)
})
</script>

<template>
  <div v-if="shouldDisplayRemainingTimeInHeader && shouldRemindSafeMode" class="safe-mode-timer">
    <div>Safe mode time remaining:</div>
    <div v-if="formattedTimeRemaining">{{ formattedTimeRemaining }}</div>
    <div v-else class="expired">Expired</div>
  </div>
</template>

<style lang="scss" scoped>
.expired {
  color: red;
}
</style>
