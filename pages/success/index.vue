<script lang="ts" setup>
import { useCartStore } from '~/store/cartStore';

const cart = useCartStore();

onMounted(() => {
  cart.clearCart();
});
</script>

<template>
  <div class="success-page page-width">
    <h1 class="success-page__title">Payment Successful 🎉</h1>
    <p class="success-page__message">
      Thank you for your purchase! Your order has been successfully processed.
    </p>

    <NuxtLink class="success-page__link" to="/"> ← Back to Home </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;

  &__title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  &__message {
    font-size: 16px;
    color: $color-gray;
    margin-bottom: 24px;
    max-width: 500px;
  }

  &__link {
    font-size: 16px;
    color: black;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid black;
    padding: 10px 20px;
    border-radius: 6px;
    transition: 0.2s;

    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>
