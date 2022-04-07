<script setup lang="ts">
import { Header, FTUE, Navigation } from "@/views"
</script>

<template>
  <Header />
  <Navigation />
  <FTUE />
  <router-view />
</template>

<style>
/* this is here for css to generate even if empty */
.placeholder {
}
</style>
