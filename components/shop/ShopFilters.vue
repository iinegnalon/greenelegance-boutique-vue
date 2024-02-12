<script lang="ts" setup></script>

<template>
  <section class="shop-filters">Filters</section>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

.shop-filters {
  display: none;
}

@media screen and (min-width: $desktop-breakpoint) {
  .shop-filters {
    display: block;
    width: 300px;
  }
}
</style>
