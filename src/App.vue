<script setup lang="ts">
import { Header, FTUE, Navigation, Notification, General } from "@/views"
</script>

<template>
  <Header />
  <Navigation />
  <FTUE />
  <Notification />
  <General />
  <router-view />
</template>

<style>
/* this is here for css to generate even if empty */
.placeholder {
}
</style>
