<script setup lang="ts">
import { Checkbox } from "@/components"
import { useJobStore } from "./store"
import { storeToRefs } from "pinia"
import { watchEffect } from "vue"
import { sendJobNotificationMessage } from "~/notifications/utils"

const { shouldNotifyOnCompletion } = storeToRefs(useJobStore())

function getNotificationIconUrl() {
  const list = document.querySelectorAll(".web-app-container ul")[1]
  if (!list) return ""
  const item = (Array.from(list.children) as HTMLDivElement[]).find((entry) => entry.innerText.includes("current"))
  if (!item) return ""
  const img = item.querySelector("img")
  if (!img?.src) return ""
  return img.src
}

function getTimestamp() {
  const textElement = document.querySelector<HTMLDivElement>(".web-app-container .text-gray-600")
  if (!textElement) return 0
  const minutes = parseInt(textElement.innerText.replace(/[a-z]/gi, ""))
  if (!minutes) return 0
  return Date.now() + minutes * 60 * 1000
}

watchEffect(() => {
  if (!getTimestamp()) return

  sendJobNotificationMessage(
    {
      iconUrl: getNotificationIconUrl(),
      timestamp: getTimestamp(),
      href: window.location.origin,
    },
    shouldNotifyOnCompletion.value
  )
})
</script>

<template>
  <Checkbox v-model="shouldNotifyOnCompletion">
    <template #default> Notify on completion </template>
    <template #subtitle> Show chrome notification when job is done </template>
  </Checkbox>
</template>
