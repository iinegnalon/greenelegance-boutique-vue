<script lang="ts" setup>
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="header">
    <div class="header__icon-container" @click="toggleMenu">
      <v-img alt="Burger Icon" src="~assets/icons/menu-burger.png" />
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
      <v-img alt="Logo" class="logo" src="~/assets/logo/logo.svg" />
    </NuxtLink>

    <nav class="header__navigation">
      <NuxtLink class="header__link" to="/">Home</NuxtLink>
      <NuxtLink class="header__link" to="/shop">Shop</NuxtLink>
      <NuxtLink class="header__link" to="/contact">Contact Us</NuxtLink>
    </nav>

    <div class="header__cart-login">
      <NuxtLink class="cart-link" to="/cart">
        <v-img alt="Cart Icon" src="~/assets/icons/shopping-bag.png" />
      </NuxtLink>
      <div class="header__button-container">
        <v-btn class="header__button button_primary" href="/login">Login</v-btn>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

.header {
  @extend .page-width;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  &__icon-container {
    width: 32px;
    height: 32px;
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
    width: 80px;
    height: auto;
  }

  &__navigation {
    display: none;
  }

  &__cart-login {
    display: flex;
    justify-self: flex-end;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__link {
    font-size: 24px;
  }

  &__button-container {
    display: none;
  }

  &__button {
  }
}

.cart-link {
  width: 32px;
  height: 32px;
}

@media screen and (min-width: $tablet-breakpoint) {
  .header {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

@media screen and (min-width: $desktop-breakpoint) {
  .header {
    padding-top: 20px;
    padding-bottom: 20px;

    &__cart-login {
      width: 23%;
    }

    &__button-container {
      display: flex;
      width: 64%;
    }

    &__button {
      width: 100%;
      height: 60px;
    }

    &__logo {
      width: 120px;
      height: auto;
    }

    &__icon-container {
      display: none;
    }

    &__navigation {
      display: flex;
      gap: 32px;
      margin-left: 10%;
    }

    &__link {
      @include underline-hover;
    }
  }

  .cart-link {
    transition: 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }
}
</style>
