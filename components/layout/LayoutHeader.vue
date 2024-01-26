<script lang="ts" setup>
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="header">
    <div class="header__icon-container" @click="toggleMenu">
      <img alt="Burger Icon" src="~assets/icons/menu-burger.png" />
    </div>

    <div
      :class="{ header__overlay_open: isMenuOpen }"
      class="header__overlay"
      @click="toggleMenu"
    ></div>
    <div
      :class="{ 'header__menu-container_open': isMenuOpen }"
      class="header__menu-container"
    >
      <div class="header__menu" @click="toggleMenu">
        <NuxtLink class="header__link" to="/">Home</NuxtLink>
        <NuxtLink class="header__link" to="/shop">Shop</NuxtLink>
        <NuxtLink class="header__link" to="/contact"> Contact Us </NuxtLink>
        <v-divider color="white" />
        <NuxtLink class="header__link" to="/login"> Login </NuxtLink>
      </div>
    </div>

    <NuxtLink class="header__logo" to="/">
      <img alt="Logo" class="logo" src="~/assets/logo/logo.svg" />
    </NuxtLink>

    <nav class="header__navigation">
      <NuxtLink class="header__link" to="/">Home</NuxtLink>
      <NuxtLink class="header__link" to="/shop">Shop</NuxtLink>
      <NuxtLink class="header__link" to="/contact">Contact Us</NuxtLink>
    </nav>

    <div class="header__cart-login">
      <NuxtLink to="/cart">
        <img
          alt="Cart Icon"
          class="cart-icon"
          src="~/assets/icons/shopping-bag.png"
        />
      </NuxtLink>
      <div class="header__button-container">
        <v-btn class="button_primary header__button" href="/login">Login</v-btn>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  &__icon-container {
    img {
      width: 32px;
      height: 32px;
    }
  }

  &__overlay {
    display: none;

    &_open {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  }

  &__menu-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0;
    overflow: hidden;
    background-color: black;
    transition: height 0.3s ease-out;
    z-index: 2;

    &_open {
      height: 200px;
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    z-index: 1;

    a {
      color: white;
      text-decoration: none;
      font-size: 18px;
    }
  }

  &__logo {
    img {
      width: 80px;
      height: auto;
    }
  }

  &__navigation {
    display: none;
  }

  &__cart-login {
    display: flex;
    align-items: center;
    gap: 24px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  &__link {
    @include underline-hover;

    font-size: 24px;
  }

  &__button-container {
    display: none;
  }

  &__button {
    width: 108px;
    height: 60px;
  }

  @media screen and (min-width: $desktop-breakpoint) {
    &__button-container {
      display: flex;
    }

    &__logo {
      img {
        width: 120px;
        height: auto;
      }
    }

    &__icon-container {
      display: none;
    }

    &__navigation {
      display: flex;
      gap: 32px;
    }
  }
}

@media screen and (min-width: $desktop-breakpoint) {
  .header {
    padding: 12px 100px;
  }
}
</style>