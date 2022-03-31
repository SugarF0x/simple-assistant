<script setup lang="ts">
import { onMounted, ref } from "vue"
import { interceptRequest } from "@/utils"

const piss = ref('cocing and fucking')

onMounted(() => {
  setTimeout(() => {
    piss.value = '123123123'
  }, 2500)

  // interceptRequest((data) => {
  //   // @ts-ignore
  //   document.querySelector('#piss').value = data.response
  // })
})
</script>

<template>
  <div>{{ piss }}</div>
  <input id="piss" v-model="piss" />
</template>
