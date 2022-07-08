<script setup lang="ts">
import { Controls } from "@/components"
import { useArenaStore } from "@/views/Arena/store"
import { storeToRefs } from "pinia"
import Checkbox from "@/components/Checkbox.vue"

const arenaStore = useArenaStore()
const { bossesToRemindOf, shouldNotifyOfBosses, shouldNotifyOfAllBosses, shouldTrackBosses } = storeToRefs(arenaStore)
</script>

<template>
  <Controls to=".py-6.max-w-6xl.mx-auto.px-4 div">
    <Checkbox v-model="shouldTrackBosses">
      <template #default> Track bosses </template>
      <template #subtitle>
        Take snapshots of currently available bosses
        <br />
        Will also remind to visit this page every week on reset
      </template>
    </Checkbox>
    <Checkbox v-model="shouldNotifyOfBosses" :parent="shouldTrackBosses">
      <template #default> Use chrome notifications </template>
      <template #subtitle> Keep track of bosses even when you are not on simple-mmo page </template>
      <template #requires> Requires boss tracking enabled </template>
    </Checkbox>
    <Checkbox v-model="shouldNotifyOfAllBosses" :parent="shouldNotifyOfBosses && shouldTrackBosses">
      <template #default> Notify of all available bosses </template>
      <template #subtitle> <i>Kill them all</i> </template>
      <template #requires> Requires both tracking and reminders enabled </template>
    </Checkbox>
  </Controls>
</template>
