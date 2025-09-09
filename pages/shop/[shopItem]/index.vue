<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fakeDatabase } from '~/utils/fakeDatabase';
import { Color } from '~/models/enums/color';
import { Size } from '~/models/enums/size';
import type { ShopItemDto } from '~/models/dto/shopItemDto';
import QuantityInput from '~/components/common/QuantityInput.vue';
import { useUserStore } from '~/store/userStore';
import { useCartStore } from '~/store/cartStore';
import { useFavoritesStore } from '~/store/favoritesStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const slug = route.params.shopItem;

const shopItem = ref<ShopItemDto | null>();
const sizeOptions = ref<Size[]>([]);
const colorOptions = ref<Color[]>([]);
const loadingShopItem = ref(true);
const selectedColor = ref<Color | null>(null);
const selectedSize = ref<Size | null>(null);
const quantity = ref(1);
const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});

const favorite = computed(() =>
  favoritesStore.items.includes(shopItem.value?.id ?? ''),
);

onMounted(() => {
  initShopItem();
});

async function initShopItem() {
  await waitFor();

  shopItem.value = fakeDatabase.shopItems.find((item) => item.slug === slug);

  loadingShopItem.value = false;

  if (!shopItem.value) return;

  selectedColor.value = shopItem.value.colors[0] ?? null;
  selectedSize.value = shopItem.value.sizes[0] ?? null;

  colorOptions.value = shopItem.value.colors;
  sizeOptions.value = shopItem.value.sizes.filter(
    (value) => value !== Size.None,
  );
}

function showNotification(message: string) {
  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = message;
}

function addToFavorites() {
  if (!userStore.user) {
    router.push('/login');
    return;
  }

  if (!shopItem.value) return;

  if (!favorite.value) {
    favoritesStore.addToFavorites(shopItem.value.id);
    showNotification(`Added "${shopItem.value.name}" to Favorites`);
    return;
  }

  favoritesStore.removeItem(shopItem.value.id);
  showNotification(`Removed "${shopItem.value.name}" from Favorites`);
}

function addToCart() {
  if (!shopItem.value) return;

  cartStore.addToCart(
    shopItem.value,
    selectedColor.value,
    selectedSize.value,
    quantity.value,
  );

  quantity.value = 1;

  showNotification(`Added "${shopItem.value.name}" to Cart`);
}

function selectColor(color: Color) {
  selectedColor.value = color;
}

function selectSize(size: Size) {
  selectedSize.value = size;
}
</script>

<template>
  <div v-if="shopItem && !loadingShopItem" class="product-page page-width">
    <div class="product__image">
      <img :alt="shopItem.name" :src="shopItem.image" />
    </div>
    <div class="product__details">
      <div class="product__header">
        <h1 class="product__brand ellipsis">{{ shopItem.brand }}</h1>
        <div
          :class="{ product__stock_out: shopItem.stock < 1 }"
          class="product__stock"
        >
          <span v-if="shopItem.stock >= 1">In Stock: {{ shopItem.stock }}</span>
          <span v-else>Out of Stock</span>
        </div>
      </div>
      <h2 class="product__name">{{ shopItem.name }}</h2>
      <p class="product__description">{{ shopItem.description }}</p>

      <p class="product__price">
        <span class="shop-item-card__final-price">
          ${{ (shopItem.discountedPrice ?? shopItem.price) / 100 }}
        </span>
        <span
          v-if="shopItem.discountedPrice"
          class="shop-item-card__crossed-price"
        >
          ${{ shopItem.price / 100 }}
        </span>
      </p>

      <div class="product__options">
        <div v-if="colorOptions.length" class="option">
          <label>Color</label>
          <div class="select-options">
            <div
              v-for="color in colorOptions"
              :key="color"
              :class="{ 'option-square_selected': selectedColor === color }"
              :style="{ backgroundColor: Color.toHex(color as Color) }"
              class="option-square option-square_color"
              @click="selectColor(color)"
            ></div>
          </div>
        </div>

        <div v-if="sizeOptions.length" class="option">
          <label>Size</label>
          <div class="select-options">
            <div
              v-for="size in sizeOptions"
              :key="size"
              :class="{ 'option-square_selected': selectedSize === size }"
              class="option-square option-square_size"
              @click="selectSize(size)"
            >
              {{ size }}
            </div>
          </div>
        </div>
      </div>

      <div class="product__actions">
        <QuantityInput
          v-model="quantity"
          :max="shopItem.stock"
          :min="1"
          class="product__quantity"
        />
        <v-btn class="product__add-to-cart" color="black" @click="addToCart">
          Add to Cart
        </v-btn>
        <v-btn
          :icon="favorite ? 'mdi-heart' : 'mdi-heart-outline'"
          class="product__add-to-favorites"
          variant="outlined"
          @click="addToFavorites"
        />
      </div>
    </div>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>
  <div v-else-if="loadingShopItem" class="page-loader">
    <v-progress-circular
      color="black"
      indeterminate
      size="32"
    ></v-progress-circular>
  </div>
  <div v-else class="product-not-found">Product not found</div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.product-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 12px;

  .product {
    &__image {
      flex: 1;
      max-width: 800px;

      img {
        width: 100%;
        border-radius: 12px;
      }
    }

    &__details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .select-options {
        display: flex;
        gap: 8px;
        margin-top: 6px;
        flex-wrap: wrap;

        .option-square {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid $color-gray;
          font-size: 14px;

          &_selected {
            border: 2px solid black;
          }

          &_size.option-square_selected {
            color: white;
            background-color: black;
          }
        }
      }

      .option {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;

        label {
          margin-bottom: 4px;
          font-weight: bold;
        }

        input,
        select {
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 6px;
          max-width: 200px;
        }
      }
    }

    &__header {
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
    }

    &__brand {
      margin-top: 0;
      line-height: normal;
    }

    &__stock {
      color: $color-green;
      background-color: $color-green-l;
      padding: 12px;
      border-radius: 8px;
      font-size: 14px;
      width: fit-content;
      white-space: nowrap;

      &_out {
        color: $color-red;
        background-color: $color-red-l;
      }
    }

    &__name,
    &__description {
      color: $color-secondary;
    }

    &__price {
      display: flex;
      align-items: baseline;
      gap: 8px;

      .shop-item-card__final-price {
        font-weight: bold;
        font-size: 20px;
      }

      .shop-item-card__crossed-price {
        text-decoration: line-through;
        color: $color-gray;
        font-size: 18px;
      }
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }

    &__add-to-cart {
      order: 2;
      width: 100%;
      height: 44px;
      text-transform: none;
      font-size: 14px;
      border-radius: 6px;
    }

    &__quantity,
    &__add-to-favorites {
      order: 1;
      height: 44px;
    }

    &__quantity {
      margin-right: auto;
      min-width: 0;
    }

    &__add-to-favorites {
      width: 44px;
      border-radius: 6px;
    }
  }
}

.page-loader {
  display: flex;
  justify-content: center;
  margin-top: 15%;
}

.product-not-found {
  padding: 40px;
  text-align: center;
  font-size: 1.2rem;
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .product-page {
    gap: 40px;
    flex-direction: row;
    justify-content: center;

    .product {
      &__details {
        max-width: 300px;
      }

      &__actions {
        flex-wrap: nowrap;
        align-items: center;
      }

      &__header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      &__add-to-cart {
        order: 0;
        width: auto;
        max-width: 415px;
        flex-grow: 1;
      }

      &__quantity,
      &__add-to-favorites {
        order: 0;
      }
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .product-page {
    .product {
      &__details {
        max-width: 400px;
      }
    }
  }
}

// Other
@media screen and (min-width: 1024px) {
  .product-page {
    .product {
      &__details {
        max-width: 600px;
      }
    }
  }
}
</style>
