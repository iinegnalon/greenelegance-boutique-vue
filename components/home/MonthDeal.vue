<script lang="ts" setup>
const currentDate = new Date();

// Creating date 25 days ahead from now
const countdownDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 25,
  currentDate.getHours() + 18,
  currentDate.getMinutes() + 15,
  currentDate.getSeconds() + 46,
);
</script>

<template>
  <section class="month-deal page-width">
    <div class="month-deal__content">
      <div class="month-deal__left">
        <h2 class="month-deal__title">Deal of the Month</h2>
        <p class="month-deal__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum dapibus vulputate. Cras a finibus ligula, at rhoncus
          massa. Duis id nunc ut nunc volutpat varius ut finibus justo. In
          hendrerit libero vitae sodales vestibulum.
        </p>
        <CountdownBlocks :end-date="countdownDate" />
        <v-btn class="month-deal__button button_primary" href="/shop">
          View All Products
        </v-btn>
      </div>
      <div class="month-deal__right">
        <NuxtLink to="/shop/classic-t-shirt">
          <v-img
            alt="New Collection"
            class="month-deal__image"
            src="/images/month-deal.png"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/assets/css/variables.scss';

// Mobile
.month-deal {
  &__content {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }

  &__button {
    width: fit-content;
    height: 40px !important;
    margin-top: 8px;
  }

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: fit-content;
    background: white;
    border-radius: 8px;
  }

  &__right {
    position: relative;
    height: 100%;
    width: 49%;
  }

  &__image {
    max-height: 700px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__title {
    font-family: 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 28px;
  }

  &__description {
    margin: 0;
    font-size: 14px;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .month-deal {
    &__content {
      gap: 16px;
    }

    &__button {
      height: 50px !important;
      margin-top: 4px;
    }

    &__left {
      gap: 20px;
    }

    &__title {
      font-size: 32px;
    }

    &__description {
      font-size: 16px;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .month-deal {
    display: block;

    &__content {
      flex-direction: row;
      background: white;
      gap: 20px;
    }

    &__button {
      height: 60px !important;
      margin-top: 0;
    }

    &__left {
      display: flex;
      align-items: flex-start;
      gap: 40px;
    }

    &__title {
      font-size: 40px;
    }

    &__description {
      font-size: 18px;
    }

    &__right {
      display: block;
    }
  }
}
</style>
