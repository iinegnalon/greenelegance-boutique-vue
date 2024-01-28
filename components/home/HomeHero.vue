<script lang="ts" setup></script>

<template>
  <section class="home-page-hero">
    <div class="home-page-hero__content">
      <div class="home-page-hero__left">
        <p class="home-page-hero__description">Classic Exclusive</p>
        <h2 class="home-page-hero__title">Winter Collection</h2>
        <p class="home-page-hero__sale">UP TO 40% OFF</p>
        <v-btn class="home-page-hero__button button_primary" href="/shop">
          Shop Now
        </v-btn>
      </div>
      <div class="home-page-hero__right">
        <img
          alt="New Collection"
          class="home-page-hero__image"
          src="/images/hero-ad.png"
        />
      </div>
      <div class="home-page-hero__animated-text"><pre>SALE</pre></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.home-page-hero {
  display: none;

  &__content {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  &__button {
    width: 36%;
    height: 60px !important;
  }

  &__left {
    flex: 1;
    z-index: 2;
    padding-left: 8.5%;
  }

  &__right {
    position: relative;
    flex: 1;
    z-index: 2;
    height: 100%;
    width: 49%;
  }

  &__image {
    height: 100%;
  }

  &__description {
    font-size: 20px;
    margin-bottom: 20px;
  }

  &__title {
    font-family: 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 10px;
  }

  &__sale {
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__animated-text {
    position: absolute;
    top: 85%;
    left: 100%;
    font-size: 200px;
    font-family: 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: white;
    white-space: nowrap;
    animation: slideLeft 20s linear infinite;
    transform: translateY(-50%);
    z-index: 1;
    user-select: none;

    @keyframes slideLeft {
      0% {
        left: 60%;
      }
      100% {
        left: -60%;
      }
    }
  }
}

@media screen and (min-width: $desktop-breakpoint) {
}

@media screen and (min-width: $desktop-breakpoint) {
  .home-page-hero {
    display: block;
  }
}
</style>
