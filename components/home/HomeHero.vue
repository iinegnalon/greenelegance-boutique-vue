<script lang="ts" setup></script>

<template>
  <section class="home-page-hero page-width">
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
        <v-img
          alt="New Collection"
          class="home-page-hero__image"
          cover
          src="/images/hero-ad.png"
        />
      </div>
      <div class="home-page-hero__animated-text"><pre>SALE</pre></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/assets/css/variables.scss';

// Mobile
.home-page-hero {
  &__content {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    background: url('/images/hero-ad.png') 40% 60%;
    justify-content: center;
    height: 70vh;
  }

  &__button {
    width: fit-content;
    height: 40px !important;
  }

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    background: white;
    padding: 16px 20px;
    border-radius: 8px;
  }

  &__right {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 50%;
    display: none;
  }

  &__image {
    height: 100%;
  }

  &__description {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__title {
    font-family: 'Trebuchet MS', sans-serif;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 5px;
  }

  &__sale {
    font-size: 16px;
    margin-bottom: 10px;
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
    display: none;

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

@media screen and (min-width: $tablet-breakpoint) {
  .home-page-hero {
    &__button {
      height: 50px !important;
    }

    &__left {
      padding: 20px 40px;
    }

    &__description {
      font-size: 16px;
      margin-bottom: 16px;
    }

    &__title {
      font-size: 32px;
      margin-bottom: 16px;
    }

    &__sale {
      font-size: 20px;
      margin-bottom: 24px;
    }
  }
}

@media screen and (min-width: $desktop-breakpoint) {
  .home-page-hero {
    display: block;

    &__content {
      z-index: 2;
      height: 100vh;
      background: #f0f0f0;
    }

    &__button {
      height: 60px !important;
    }

    &__left {
      z-index: 2;
      width: 50%;
      padding-left: math.div(1, 11) * 100%;
      display: block;
      background: transparent;
    }

    &__description {
      font-size: 20px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 40px;
      margin-bottom: 10px;
    }

    &__sale {
      font-size: 24px;
      margin-bottom: 20px;
    }

    &__right {
      display: block;
    }

    &__animated-text {
      display: block;
    }
  }
}
</style>
