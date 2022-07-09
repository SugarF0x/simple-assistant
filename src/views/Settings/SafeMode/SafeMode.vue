<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useSafeModeStore } from "./store"
import { storeToRefs } from "pinia"
import { onBeforeMount } from "vue"
import { Duration, add } from "date-fns"

const safeModeStore = useSafeModeStore()
const { shouldRemindSafeMode, expirationTimestamp } = storeToRefs(safeModeStore)

onBeforeMount(() => {
  const timeDiv = document.querySelector<HTMLDivElement>("main .bg-white.mt-4 div.text-sm.text-gray-500")
  if (!timeDiv) {
    expirationTimestamp.value = new Date().toISOString()
    return
  }

  const remainingTimeString = timeDiv.innerText.replace("Expires in ", "")
  const remainingDuration = remainingTimeString
    .split(/(,|and)/)
    .map((e) => e.trim().split(" "))
    .map((e): [number, keyof Duration] => [Number(e[0]), e[1] as keyof Duration])
    .reduce<Duration>((acc, [val, key]) => ({ ...acc, [key]: val }), {})

  expirationTimestamp.value = add(new Date(), remainingDuration).toISOString()
})
</script>

<template>
  <Controls to=".px-4.py-5.bg-white.shadow.rounded-lg.overflow-hidden.mt-4">
    <Checkbox v-model="shouldRemindSafeMode">
      <template #default> Remind to enable safe mode </template>
      <template #subtitle> A safe mode a day keeps the doctor away </template>
    </Checkbox>
  </Controls>
</template>
