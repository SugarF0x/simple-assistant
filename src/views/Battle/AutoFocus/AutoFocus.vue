<script setup lang="ts">
import { Checkbox } from "@/components"
import { useBattleStore } from "../store"
import { storeToRefs } from "pinia"
import { useAttackButton } from "./useAttackButton"
import { useCloseButton } from "./useCloseButton"

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
</template>
