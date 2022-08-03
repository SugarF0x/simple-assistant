<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useSafeModeStore } from "./store"
import { storeToRefs } from "pinia"
import { onBeforeMount, watchEffect } from "vue"
import { Duration, add } from "date-fns"
import { sendSafeModeNotificationMessage } from "~/notifications/safeMode/client"

const { shouldRemindSafeMode, shouldDisplayRemainingTimeInHeader, shouldUseChromeNotifications, expirationTimestamp } =
  storeToRefs(useSafeModeStore())

function getRemainingDuration() {
  const timeDiv = document.querySelector<HTMLDivElement>("main .bg-white.mt-4 div.text-sm.text-gray-500")
  if (!timeDiv) return {}

  const remainingTimeString = timeDiv.innerText.replace("Expires in ", "")
  return remainingTimeString
    .split(/(,|and)/)
    .map((e) => e.trim().split(" "))
    .map((e): [number, keyof Duration] => [Number(e[0]), e[1] as keyof Duration])
    .reduce<Duration>((acc, [val, key]) => ({ ...acc, [key]: val }), {})
}

const remainingDuration = getRemainingDuration()

onBeforeMount(() => {
  expirationTimestamp.value = add(new Date(), remainingDuration).toISOString()
})

watchEffect(() => {
  if (!Object.keys(remainingDuration).length) return

  sendSafeModeNotificationMessage(add(new Date(), remainingDuration).toISOString(), shouldUseChromeNotifications.value)
})
</script>

<template>
  <Controls to=".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.mt-4">
    <Checkbox v-model="shouldRemindSafeMode">
      <template #default> Remind to enable safe mode </template>
      <template #subtitle> A safe mode a day keeps the doctor away </template>
    </Checkbox>
    <Checkbox
      v-model="shouldUseChromeNotifications"
      :parent="shouldRemindSafeMode"
      @enable-required="shouldRemindSafeMode = true"
    >
      <template #default> Show chrome notification </template>
      <template #subtitle> Be on point even outside simple mmo page </template>
      <template #requires> Requires reminder enabled </template>
    </Checkbox>
    <Checkbox
      v-model="shouldDisplayRemainingTimeInHeader"
      :parent="shouldRemindSafeMode"
      @enable-required="shouldRemindSafeMode = true"
    >
      <template #default> Display remaining time in header </template>
      <template #subtitle> Know when the time to reenable is coming </template>
      <template #requires> Requires reminder enabled </template>
    </Checkbox>
  </Controls>
</template>
