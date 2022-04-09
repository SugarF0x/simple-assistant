<template>
  <div class="cardWrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cardWrapper {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: min(80vw, 300px);

  -webkit-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
}
</style>
