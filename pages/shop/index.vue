<script lang="ts" setup>
import type { Ref } from 'vue';
import ShopFilters from '~/components/shop/ShopFilters.vue';
import { waitFor } from '~/utils';
import type { ShopItemDto } from '~/models/dto/shopItemDto';
import ShopItemCard from '~/components/ShopItemCard.vue';

const sortOptions = ref([
  'Date: Newest',
  'Date: Oldest',
  'Price: High to Low',
  'Price: Low to High',
  'Name: A - Z',
  'Name: Z - A',
]);
const sortBy = ref(sortOptions.value[0]);
const currentPage = ref(1);
const filteredItems: Ref<ShopItemDto[]> = ref([]);
const notificationSnackbar = ref({
  show: false,
  message: '',
  timeout: 2000,
  color: '',
});
const itemsLoading = ref(true);
const pageLoading = ref(false);

onMounted(() => {
  getShopItems();
  document.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  if (itemsLoading.value) {
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  if (scrollHeight - scrollTop <= clientHeight + 400) {
    currentPage.value++;
    getShopItems();
  }
}

async function getShopItems() {
  itemsLoading.value = true;
  pageLoading.value = true;
  await waitFor();

  filteredItems.value = [...filteredItems.value, ...fakeDatabase.shopItems];

  itemsLoading.value = false;
  pageLoading.value = false;
}

function showNotification(message: string) {
  notificationSnackbar.value.show = true;
  notificationSnackbar.value.color = 'success';
  notificationSnackbar.value.message = message;
}

function handleFavorite(value: boolean, shopItem: ShopItemDto) {
  if (value) {
    showNotification(`Added "${shopItem.name}" to Favorites`);
    return;
  }

  showNotification(`Removed "${shopItem.name}" from Favorites`);
}

function handleCart(value: boolean, shopItem: ShopItemDto) {}

function handleSortByUpdate() {
  currentPage.value = 1;
  filteredItems.value = [];
  getShopItems();
}
</script>

<template>
  <div class="shop-page page-width">
    <ShopFilters />
    <section class="catalog">
      <div class="catalog__header">
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          class="sort-by-select"
          hide-details
          label="Sort by"
          outlined
          variant="plain"
          @update:model-value="handleSortByUpdate"
        ></v-select>
      </div>
      <div v-if="itemsLoading && currentPage == 1" class="catalog__grid">
        <v-skeleton-loader
          v-for="index in 20"
          :key="index"
          class="skeleton-card"
        >
        </v-skeleton-loader>
      </div>
      <div v-else-if="filteredItems.length > 0" class="catalog__grid">
        <ShopItemCard
          v-for="item in filteredItems"
          :key="item.id"
          :shop-item="item"
          @cart="handleCart"
          @favorite="handleFavorite"
        />
      </div>
      <div v-if="pageLoading && currentPage > 1" class="page-loader">
        <v-progress-circular
          color="black"
          indeterminate
          size="32"
        ></v-progress-circular>
      </div>
    </section>

    <v-snackbar
      v-model="notificationSnackbar.show"
      :color="notificationSnackbar.color"
    >
      {{ notificationSnackbar.message }}
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/styles.scss';
@import '@/assets/css/variables.scss';

// Mobile
.shop-page {
  display: flex;
  gap: 30px;
}

.catalog {
  width: 100%;

  &__header {
    display: grid;
    margin-bottom: 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 12px;
  }
}

.sort-by-select {
  width: 180px;
  justify-self: flex-end;
}

.page-loader {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.skeleton-card {
  aspect-ratio: 2 / 3;
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .shop-page {
    gap: 40px;
  }

  .catalog {
    &__header {
      margin-bottom: 16px;
    }

    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      grid-gap: 16px;
    }
  }

  .page-loader {
    margin-top: 16px;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .shop-page {
    gap: 60px;
  }

  .catalog {
    &__header {
      margin-bottom: 20px;
    }

    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(216px, 1fr));
      grid-gap: 20px;
    }
  }

  .page-loader {
    margin-top: 20px;
  }
}
</style>
