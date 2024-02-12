<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const userStore = useUserStore();

const menuOpen = ref(false);
const lastScrollTop = ref(0);
const scrolling = ref(false);
const headerHidden = ref(false);
const logoutLoading = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

// Handle scroll events without multiple handlers
function handleScroll() {
  if (scrolling.value) {
    return;
  }

  requestAnimationFrame(() => {
    checkScrollDirection();
    scrolling.value = false;
  });
  scrolling.value = true;
}

// Determine scroll direction
function checkScrollDirection() {
  const scrollTop = document.documentElement.scrollTop;
  headerHidden.value = scrollTop > lastScrollTop.value;
  lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop;
}

async function logout() {
  logoutLoading.value = true;
  await userStore.logout();
  logoutLoading.value = false;

  router.go(0);
}
</script>

<template>
  <header :class="{ header_hidden: headerHidden }" class="header">
    <div class="header__icon-container" @click="toggleMenu">
      <v-icon size="36">mdi-menu</v-icon>
    </div>

    <div
      :class="{ header__overlay_open: menuOpen }"
      class="header__overlay"
      @click="toggleMenu"
    ></div>
    <div
      :class="{
        'header__menu-container_open': menuOpen,
        'header__menu-container_authed': menuOpen && userStore.user,
      }"
      class="header__menu-container"
    >
      <div class="header__menu" @click="toggleMenu">
        <NuxtLink class="header__link" to="/">Home</NuxtLink>
        <NuxtLink class="header__link" to="/shop">Shop</NuxtLink>
        <NuxtLink class="header__link" to="/contact"> Contact Us </NuxtLink>
        <v-divider color="white" />
        <NuxtLink v-if="!userStore.user" class="header__link" to="/login">
          Login / Sign Up
        </NuxtLink>
        <div v-else class="header__menu-user">
          <span
            :title="userStore.user!.email"
            class="header__menu-welcome-message ellipsis"
            @click.stop
          >
            Welcome, {{ userStore.user!.firstName }}!
          </span>
          <NuxtLink class="header__link" to="/profile"> Profile </NuxtLink>
          <span v-if="!logoutLoading" class="header__link" @click.stop="logout">
            Logout
          </span>
          <v-progress-circular
            v-else
            color="white"
            indeterminate
            size="28.8"
          ></v-progress-circular>
        </div>
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

    <div class="flex1"></div>

    <div class="header__cart-login">
      <span
        v-if="userStore.user"
        :title="userStore.user!.email"
        class="header__welcome-message ellipsis"
      >
        Welcome, {{ userStore.user!.firstName }}!
      </span>

      <NuxtLink class="cart-link" to="/cart">
        <v-icon size="32">mdi-cart-outline</v-icon>
        <div v-if="false" class="cart-link__count">{{ 10 }}</div>
      </NuxtLink>

      <div v-if="!userStore.user" class="header__button-container">
        <v-btn class="header__button button_primary" href="/login">
          Login / Sign Up
        </v-btn>
      </div>

      <div v-else class="header__user-container">
        <NuxtLink class="cart-link" to="/profile">
          <v-icon size="32">mdi-account-outline</v-icon>
        </NuxtLink>

        <v-btn
          :loading="logoutLoading"
          class="header__button button_primary"
          @click="logout"
        >
          Logout
        </v-btn>
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
  background-color: #fff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: top 0.3s;

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

    &_authed {
      height: 264px;
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    z-index: 1;
    color: white;
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

  &__menu-user {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__menu-welcome-message {
    font-size: 12px;
  }

  &__link {
    font-size: 18px;
    cursor: pointer;
  }

  &__button-container {
    display: none;
  }

  &__user-container {
    display: none;
  }

  &__welcome-message {
    display: none;
  }
}

.cart-link {
  position: relative;
  width: 32px;
  height: 32px;

  &__count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: black;
    color: white;
    border-radius: 50%;
    padding: 4px;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.flex1 {
  display: none;
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
    justify-content: flex-start;

    &_hidden {
      top: -160px;
    }

    &__button-container {
      display: block;
    }

    &__button {
      height: 60px !important;
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
      margin-left: calc(50% - 320px);
    }

    &__link {
      @include underline-hover;
      font-size: 24px;
    }

    &__user-container {
      display: flex;
      align-items: center;
      gap: 24px;
    }
  }

  .cart-link {
    transition: 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .flex1 {
    display: block;
    flex: 1;
  }
}

@media screen and (min-width: 1150px) {
  .header {
    &__welcome-message {
      display: block;
      font-size: 16px;
      color: $secondary-color;
      max-width: 160px;
    }
  }
}
</style>
