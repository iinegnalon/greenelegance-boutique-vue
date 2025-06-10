<script lang="ts" setup>
import { type CartItem, useCartStore } from '~/store/cartStore';
import { Color } from '~/models/enums/color';
import { Size } from '~/models/enums/size';
import QuantityInput from '~/components/common/QuantityInput.vue';

defineProps<{ cartItem: CartItem; index: number }>();

const cart = useCartStore();
</script>

<template>
  <div class="cart-item-card">
    <NuxtLink
      :to="`/shop/${cartItem.product.slug}`"
      class="cart-item-card__image"
    >
      <img :alt="cartItem.product.name" :src="cartItem.product.image" />
    </NuxtLink>

    <div class="cart-item-card__info">
      <NuxtLink
        :to="`/shop/${cartItem.product.slug}`"
        class="cart-item-card__name"
      >
        <h3>{{ cartItem.product.name }}</h3>
      </NuxtLink>
      <div class="cart-item-card__details">
        <span
          v-if="cartItem.selectedColor && cartItem.selectedColor !== Color.None"
        >
          Color: <strong>{{ cartItem.selectedColor }}</strong>
        </span>
        <span
          v-if="
            cartItem.selectedColor &&
            cartItem.selectedColor !== Color.None &&
            cartItem.selectedSize &&
            cartItem.selectedSize !== Size.None
          "
        >
          |
        </span>
        <span
          v-if="cartItem.selectedSize && cartItem.selectedSize !== Size.None"
        >
          Size: <strong>{{ cartItem.selectedSize }}</strong>
        </span>
      </div>
      <div class="cart-item-card__price">
        <span class="cart-item-card__final-price">
          ${{
            ((cartItem.product.discountedPrice ?? cartItem.product.price) *
              cartItem.quantity) /
            100
          }}
        </span>
        <span
          v-if="cartItem.product.discountedPrice"
          class="cart-item-card__crossed-price"
        >
          ${{ (cartItem.product.price * cartItem.quantity) / 100 }}
        </span>
      </div>
    </div>

    <div class="cart-item-card__actions">
      <QuantityInput
        :model-value="cartItem.quantity"
        class="cart-item-card__quantity"
        @decrease="cart.updateQuantity(index, -1)"
        @increase="cart.updateQuantity(index, 1)"
      />
      <v-btn
        class="cart-item-card__btn cart-item-card__btn--remove"
        variant="text"
        @click="cart.removeItem(index)"
      >
        Remove
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.cart-item-card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid $color-background;
  border-radius: 6px;
  background: white;
  gap: 12px;

  &__image {
    margin: auto;

    img {
      width: fit-content;
      object-fit: contain;
      max-height: 200px;
      border-radius: 4px;
    }
  }

  &__name {
    display: block;
    width: fit-content;

    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
  }

  &__details {
    font-size: 14px;
    color: $color-secondary;
    margin-bottom: 4px;
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  &__final-price {
    font-weight: bold;
    font-size: 16px;
  }

  &__crossed-price {
    text-decoration: line-through;
    color: $color-gray;
    font-size: 14px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__btn {
    font-size: 14px;
    padding: 4px 8px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    text-transform: none;
  }

  &__btn--quantity {
    background: #f0f0f0;
  }

  &__btn--remove {
    background: $color-red-l;
    color: $color-red;
  }

  &__quantity,
  &__btn--remove {
    width: 113px;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .cart-item-card {
    flex-direction: row;
    align-items: center;

    &__image {
      margin: 0;

      img {
        width: 100px;
        height: auto;
      }
    }

    &__info {
      flex: 1;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .cart-item-card {
    &__name {
      h3 {
        font-size: 18px;
      }
    }

    &__image {
      img {
        width: auto;
      }
    }
  }
}
</style>
