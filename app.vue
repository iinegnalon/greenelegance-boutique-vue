<script lang="ts" setup>
import { useUserStore } from '~/store/userStore';
import { useCartStore } from '~/store/cartStore';

const userStore = useUserStore();
const cartStore = useCartStore();

onMounted(() => {
  initUser();
  initCart();
});

function initUser() {
  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    try {
      const parsedUser = JSON.parse(userFromLocalStorage);
      userStore.setUser(parsedUser);
    } catch (e) {
      localStorage.removeItem('user');
    }
  }
}

function initCart() {
  const cartFromLocalStorage = localStorage.getItem('cart');
  if (cartFromLocalStorage) {
    try {
      const parsedCart = JSON.parse(cartFromLocalStorage);
      cartStore.setCart(parsedCart);
    } catch (e) {
      localStorage.removeItem('cart');
    }
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>GreenElegance Boutique</Title>
      <Meta content="GreenElegance Boutique" name="description" />
      <Meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <Body class="grid">
      <NuxtLayout>
        <v-app>
          <NuxtPage />
        </v-app>
      </NuxtLayout>
    </Body>
  </div>
</template>
