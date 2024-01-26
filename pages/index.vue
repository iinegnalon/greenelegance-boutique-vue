<script lang="ts" setup>
import HomeHero from '~/components/home/HomeHero.vue';
import CategoryCarousel from '~/components/home/CategoryCarousel.vue';
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <CategoryCarousel />
    <!--    <OurBestseller />-->
  </div>
</template>

<style lang="scss">
@import '@/assets/css/variables.scss';

// Mobile
.home-page {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .home-page {
    gap: 60px;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .home-page {
    gap: 80px;
  }
}
</style>
