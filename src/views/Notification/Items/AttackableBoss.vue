<script setup lang="ts">
import BaseItem from "./_BaseItem.vue"
import { Button } from "@/components"
import { Boss, useArenaStore } from "../../Arena/store"
import { storeToRefs } from "pinia"
import { Ref } from "vue"

const { attackableBosses } = storeToRefs(useArenaStore())
/** God i live webstorm :angry: gotta do this shit to type out template */
const bosses: Ref<Boss[]> = attackableBosses
</script>

<template>
  <template v-if="bosses.length">
    <template v-for="boss in bosses" :key="boss.name">
      <BaseItem v-if="!boss.isDead" @dismiss="boss.isDead = true">
        <template #title> A boss is not attackable! </template>
        <template #text>
          <div class="wrapper">
            <img :src="boss.img" alt="boss_img" />
            <span>{{ boss.name }}</span>
          </div>
        </template>
        <template #actions>
          <Button :href="boss.href"> Go to boss </Button>
        </template>
      </BaseItem>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;

  span {
    margin: auto 1rem;
  }
}
</style>
