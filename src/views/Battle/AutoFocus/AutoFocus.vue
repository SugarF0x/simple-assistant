<script setup lang="ts">
import FocusItem from "./FocusItem.vue"
import { useBattleStore } from "../store"
import { useAttackButton } from "./useAttackButton"
import { useCloseButton } from "./useCloseButton"

import { Checkbox } from "@/components"
import { storeToRefs } from "pinia"

const battleStore = useBattleStore()
const { shouldAutoFocusAttack } = storeToRefs(battleStore)

useAttackButton(shouldAutoFocusAttack)
useCloseButton(shouldAutoFocusAttack)
</script>

<template>
  <Checkbox v-model="shouldAutoFocusAttack">
    <template #default> Autofocus attack button </template>
    <template #subtitle> Just hit space/enter! </template>
  </Checkbox>
  <FocusItem />
</template>
