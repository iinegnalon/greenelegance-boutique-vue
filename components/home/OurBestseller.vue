<script lang="ts" setup>
import ShopItemCard from '~/components/ShopItemCard.vue';
import type { ShopItemDto } from '~/models/dto/shopItemDto';
import { useUserStore } from '~/store/userStore';
import { useFavoritesStore } from '~/store/favoritesStore';

const router = useRouter();
const userStore = useUserStore();
const favoritesStore = useFavoritesStore();

const shopItems = fakeDatabase.shopItems.slice(0, 8);

const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});

function showNotification(message: string) {
  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = message;
}

function handleFavorite(value: boolean, shopItem: ShopItemDto) {
  if (!userStore.user) {
    router.push('/login');
    return;
  }

  if (value) {
    favoritesStore.addToFavorites(shopItem.id);
    showNotification(`Added "${shopItem.name}" to Favorites`);
    return;
  }

  favoritesStore.removeItem(shopItem.id);
  showNotification(`Removed "${shopItem.name}" from Favorites`);
}
</script>

<template>
  <section class="our-bestseller page-width">
    <h2 class="our-bestseller__title">Our Bestseller</h2>
    <div class="our-bestseller__grid">
      <ShopItemCard
        v-for="item in shopItems"
        :key="item.id"
        :shop-item="item"
        @favorite="handleFavorite"
      />
    </div>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.our-bestseller {
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__grid {
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .our-bestseller {
    &__title {
      font-size: 28px;
      margin-bottom: 16px;
    }

    &__grid {
      grid-gap: 16px;
    }
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .our-bestseller {
    &__title {
      font-size: 32px;
      margin-bottom: 20px;
    }

    &__grid {
      grid-gap: 20px;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
