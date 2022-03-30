<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { interceptRequest } from "@/utils"

const piss = ref('')

watch(piss, (value) => {
  console.log('New piss value: \n\n', value)
})

onMounted(() => {
  interceptRequest((data) => {
    // @ts-ignore
    document.querySelector('#piss').value = data.response
  })
})
</script>

<template>
  <div>{{ piss }}</div>
  <input id="piss" v-model="piss" />
</template>
