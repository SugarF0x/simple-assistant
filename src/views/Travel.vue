<script setup lang="ts">
import { onMounted } from "vue"
import { interceptRequest } from "@/utils"

function handleFocus({ detail }: CustomEvent) {
  console.log(JSON.parse(detail))
}

onMounted(() => {
  interceptRequest((data) => {
    document.querySelector('#travelDataBridge')?.dispatchEvent(new CustomEvent('bridge', { detail: data }))
  })
})
</script>

<template>
  <div id="travelDataBridge" @bridge="handleFocus" />
</template>
