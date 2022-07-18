<script setup lang="ts">
import { useSafeModeStore } from "../Settings/SafeMode/store"
import { storeToRefs } from "pinia"
import { onBeforeMount, ref } from "vue"
import { formatDistance } from "date-fns"

const { expirationTimestamp, shouldDisplayRemainingTimeInHeader, shouldRemindSafeMode } = storeToRefs(
  useSafeModeStore()
)

const formattedTimeRemaining = ref("")

function getFormattedTimeRemaining() {
  formattedTimeRemaining.value = formatDistance(new Date(), new Date(expirationTimestamp.value))
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
    <div>{{ formattedTimeRemaining }}</div>
  </div>
</template>
