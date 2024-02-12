<script lang="ts" setup>
import HomeHero from '~/components/home/HomeHero.vue';
import CategoryCarousel from '~/components/home/CategoryCarousel.vue';
import OurBestseller from '~/components/home/OurBestseller.vue';
import MonthDeal from '~/components/home/MonthDeal.vue';
import ReviewCarousel from '~/components/home/ReviewCarousel.vue';
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <CategoryCarousel />
    <OurBestseller />
    <MonthDeal />
    <ReviewCarousel />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
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
