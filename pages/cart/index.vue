<script lang="ts" setup>
import { useCartStore } from '~/store/cartStore';

const cart = useCartStore();
</script>

<template>
  <div class="cart">
    <h2>Cart ({{ cart.totalItems }})</h2>
    <ul>
      <li v-for="(item, index) in cart.items" :key="item.product.id">
        {{ item.product.name }} - {{ item.quantity }}
        <button @click="cart.removeFromCart(index)">-</button>
        <button @click="cart.removeFromCart(index, true)">Remove</button>
      </li>
    </ul>
    <p>Total: {{ cart.totalPrice }} $</p>
  </div>
</template>

<style lang="scss" scoped></style>
