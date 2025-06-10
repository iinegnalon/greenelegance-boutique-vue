<script lang="ts" setup>
import { useCartStore } from '~/store/cartStore';

const cart = useCartStore();

const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});
const showClearDialog = ref(false);
const cartLoading = ref(true);

onMounted(() => {
  refreshItemsInfo();
});

// To avoid manual changes to local storage
async function refreshItemsInfo() {
  await waitFor();

  cartLoading.value = false;

  const updatedItems = [];

  for (const item of cart.items) {
    const product = fakeDatabase.shopItems.find(
      (p) => p.id === item.product.id,
    );

    if (product) {
      updatedItems.push({
        ...item,
        product,
      });
    }
  }

  cart.setCart(updatedItems);
}

function checkout() {
  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'error';
  notificationSnackbar.value.message = 'Not ready yet, sorry';
}

function confirmClearCart() {
  cart.clearCart();
  showClearDialog.value = false;
}
</script>

<template>
  <div class="cart page-width">
    <h2 class="cart__title">Cart ({{ cart.totalItems }})</h2>

    <div v-if="cartLoading">
      <v-progress-circular
        color="black"
        indeterminate
        size="32"
      ></v-progress-circular>
    </div>
    <div v-else-if="cart.items.length" class="cart__items-container">
      <div class="cart__items">
        <CartItemCard
          v-for="(item, index) in cart.items"
          :key="index"
          :cart-item="item"
          :index="index"
        />
      </div>

      <div class="cart__sidebar">
        <h3 class="cart__sidebar-title">Order Summary</h3>

        <div class="cart__total">Total: ${{ cart.totalPrice / 100 }}</div>

        <v-btn
          block
          class="cart__checkout-btn"
          color="black"
          size="large"
          @click="checkout"
        >
          Proceed to Checkout
        </v-btn>
        <v-btn
          block
          class="cart__clear-btn"
          color="error"
          size="small"
          variant="text"
          @click="showClearDialog = true"
        >
          Clear Cart
        </v-btn>
      </div>
    </div>
    <div v-else class="cart__empty">Your cart is empty.</div>

    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Clear Cart?</v-card-title>
        <v-card-text>
          Are you sure you want to remove all items from the cart?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showClearDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" variant="text" @click="confirmClearCart">
            Yes, clear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.cart {
  align-self: center;
  width: 100%;

  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__items-container {
    display: flex;
    flex-direction: column-reverse;
    gap: 16px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
  }

  &__sidebar {
    width: 100%;
    height: fit-content;
    margin-top: 24px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid $color-background;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  &__sidebar-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 0;
    border-top: 1px solid $color-background;
    border-bottom: 1px solid $color-background;
  }

  &__checkout-btn {
    width: fit-content;
    text-transform: none;
  }

  &__clear-btn {
    background: $color-red-l;
    color: $color-red;
    width: fit-content;
    text-transform: none;
  }

  &__empty {
    font-size: 16px;
    color: $color-gray;
    margin-top: 20px;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .cart {
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .cart {
    max-width: 1800px;

    &__title {
      font-size: 24px;
    }

    &__items-container {
      flex-direction: row;
      gap: 32px;
    }

    &__sidebar {
      max-width: 250px;
      margin-top: 0;
    }

    &__total {
      font-size: 20px;
    }
  }
}

// Other
@media screen and (min-width: 1024px) {
  .cart {
    &__sidebar {
      max-width: 320px;
      margin-top: 0;
    }
  }
}
</style>
