<script lang="ts" setup>
import type { ShopItemDto } from '~/models/dto/shopItemDto';

const props = defineProps<{ shopItem: ShopItemDto }>();
const emit = defineEmits(['favorite', 'cart']);

const favorite = ref(false);

function addToFavorites() {
  favorite.value = !favorite.value;
  emit('favorite', favorite.value, props.shopItem);
}
</script>

<template>
  <v-card
    :href="'/shop/' + shopItem.slug"
    :ripple="false"
    class="shop-item-card"
    elevation="0"
  >
    <v-img :src="shopItem.image" class="shop-item-card__image">
      <v-btn
        :class="{ 'favorite-btn_favorite': favorite }"
        :ripple="false"
        class="favorite-btn"
        @click="addToFavorites"
        @click.prevent
      >
        <v-icon :color="favorite ? '#FFD700' : 'black'">
          {{ favorite ? 'mdi-star' : 'mdi-star-outline' }}
        </v-icon>
      </v-btn>
    </v-img>

    <div class="shop-item-card__details">
      <div :title="shopItem.brand" class="shop-item-card__brand ellipsis">
        {{ shopItem.brand }}
      </div>
      <div :title="shopItem.name" class="shop-item-card__item-name ellipsis">
        {{ shopItem.name }}
      </div>
      <div class="shop-item-card__price">
        <span class="shop-item-card__final-price">
          ${{ (shopItem.discountedPrice ?? shopItem.price) / 100 }}
        </span>
        <span
          v-if="shopItem.discountedPrice"
          class="shop-item-card__crossed-price"
        >
          ${{ shopItem.price / 100 }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

// Mobile
.shop-item-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &__details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
  }

  &__brand {
    font-weight: bold;
    font-size: 20px;
  }

  &__item-name {
    font-size: 16px;
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
    color: gray;
    font-size: 14px;
  }

  .favorite-btn {
    min-width: 36px;
    min-height: 36px;
    padding: 0;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    transform: translateY(0);
    transition: transform 0.3s ease;
    border-radius: 100px;
  }

  .cart-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
    transform: translateY(0);
    transition: transform 0.3s ease;
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .shop-item-card {
    &__details {
      gap: 6px;
      padding: 12px;
    }

    &__brand {
      font-size: 22px;
    }

    &__item-name {
      font-size: 18px;
    }

    &__price {
      gap: 6px;
    }

    &__final-price {
      font-size: 18px;
    }

    &__crossed-price {
      font-size: 16px;
    }

    .favorite-btn {
      min-width: 48px;
      min-height: 48px;
    }
  }
}

// Tablet
@media screen and (min-width: $desktop-breakpoint) {
  .shop-item-card {
    &:hover {
      transform: translateY(-5px);

      .cart-btn {
        transform: translateY(0);
      }

      .favorite-btn {
        transform: translateY(0);
      }
    }

    &__details {
      gap: 8px;
      padding: 14px;
    }

    &__brand {
      font-size: 24px;
    }

    &__item-name {
      font-size: 20px;
    }

    &__price {
      gap: 8px;
    }

    &__final-price {
      font-size: 20px;
    }

    &__crossed-price {
      font-size: 18px;
    }

    .cart-btn {
      transform: translateY(70px);
    }

    .favorite-btn {
      transform: translateY(-70px);
      min-width: 52px;
      min-height: 52px;
    }
  }
}
</style>
