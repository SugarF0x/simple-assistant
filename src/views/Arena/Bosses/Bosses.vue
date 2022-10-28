<script setup lang="ts">
import { Controls, Checkbox } from "@/components"
import { useArenaStore } from "@/views/Arena/store"
import { storeToRefs } from "pinia"
import { onBeforeMount } from "vue"
import { getBossElements, parseBossElements } from "./utils"

const arenaStore = useArenaStore()
const { bossList, snapshotTimestamp, shouldNotifyOfBosses, shouldTrackBosses } = storeToRefs(arenaStore)

onBeforeMount(() => {
  if (bossList.value.length) return
  bossList.value = parseBossElements(getBossElements())
  snapshotTimestamp.value = new Date().toISOString()
})
</script>

<template>
  <Controls to=".px-2.py-4.mx-6.my-4.text-center.rounded-lg.backdrop-blur-md">
    <Checkbox v-model="shouldTrackBosses">
      <template #default> Track bosses </template>
      <template #subtitle>
        Take snapshots of currently available bosses
        <br />
        A notification will be displayed when boss is attackable
      </template>
    </Checkbox>
    <Checkbox v-model="shouldNotifyOfBosses" :parent="shouldTrackBosses" @enable-required="shouldTrackBosses = true">
      <template #default> Use chrome notifications </template>
      <template #subtitle> Keep track of bosses even when you are not on simple-mmo page </template>
      <template #requires> Requires boss tracking enabled </template>
    </Checkbox>
  </Controls>
</template>
