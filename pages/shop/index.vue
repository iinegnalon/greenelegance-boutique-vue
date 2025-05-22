<script lang="ts" setup>
import type { Ref } from 'vue';
import ShopFilters from '~/components/shop/ShopFilters.vue';
import { waitFor } from '~/utils';
import type { ShopItemDto } from '~/models/dto/shopItemDto';
import ShopItemCard from '~/components/ShopItemCard.vue';
import { useShopStore } from '~/store/shopStore';
import ShopSortBy from '~/components/shop/ShopSortBy.vue';

const shopStore = useShopStore();

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

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

const sortBy = computed(() => shopStore.sortBy);
const categoryFilters = computed(() => shopStore.categoryFilters);
const priceFilter = computed(() => shopStore.priceFilter);
const colorFilters = computed(() => shopStore.colorFilters);
const sizeFilters = computed(() => shopStore.sizeFilters);

onMounted(() => {
  getShopItems();
  getCategories();
  getPrices();
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
    loadNewPage();
  }
}

function loadNewPage() {
  if (filteredItems.value.length === 0) {
    return;
  }

  currentPage.value++;
  getShopItems();
}

async function getShopItems() {
  itemsLoading.value = true;
  pageLoading.value = true;
  await waitFor();

  const newItems = [...fakeDatabase.shopItems];

  const locallyFilteredItems = handleFilters(newItems);
  const sortedItems = handleSortBy(locallyFilteredItems);

  filteredItems.value = [...filteredItems.value, ...sortedItems];

  itemsLoading.value = false;
  pageLoading.value = false;
}

function handleFilters(newItems: ShopItemDto[]) {
  if (categoryFilters.value.length) {
    newItems = newItems.filter((item) =>
      item.categories.some((cat) => categoryFilters.value.includes(cat.id)),
    );
  }

  if (priceFilter.value.length) {
    newItems = newItems.filter((item) => {
      const price = item.discountedPrice ?? item.price;
      return price >= priceFilter.value[0] && price <= priceFilter.value[1];
    });
  }

  if (colorFilters.value.length) {
    newItems = newItems.filter((item) =>
      item.colors.some((col) => colorFilters.value.includes(col)),
    );
  }

  if (sizeFilters.value.length) {
    newItems = newItems.filter((item) =>
      item.sizes.some((size) => sizeFilters.value.includes(size)),
    );
  }

  return newItems;
}

function handleSortBy(newItems: ShopItemDto[]) {
  switch (sortBy.value) {
    case 'date-desc':
      newItems.sort((a, b) => b.dateCreated - a.dateCreated);
      break;
    case 'date-asc':
      newItems.sort((a, b) => a.dateCreated - b.dateCreated);
      break;
    case 'price-desc':
      newItems.sort(
        (a, b) =>
          (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price),
      );
      break;
    case 'price-asc':
      newItems.sort(
        (a, b) =>
          (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price),
      );
      break;
    case 'name-asc':
      newItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      newItems.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return newItems;
}

async function getCategories() {
  shopStore.setCategoryFiltersOptionsLoading(true);
  await waitFor();
  shopStore.setCategoryFiltersOptions(fakeDatabase.categories);
  shopStore.setCategoryFiltersOptionsLoading(false);
}

async function getPrices() {
  await waitFor();
  const prices = fakeDatabase.shopItems.map(
    (item) => item.discountedPrice ?? item.price,
  );
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  shopStore.setPriceFilterMin(min);
  shopStore.setPriceFilterMax(max);
  shopStore.setPriceFilter([min, max]);
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

function handleCart(value: boolean, shopItem: ShopItemDto) {
  if (value) {
    showNotification(`Added "${shopItem.name}" to Cart`);
    return;
  }

  showNotification(`Removed "${shopItem.name}" from Cart`);
}

function handleSortByFiltersUpdate() {
  currentPage.value = 1;
  filteredItems.value = [];
  getShopItems();
}

function debouncedHandleSortByFiltersUpdate() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    handleSortByFiltersUpdate();
  }, 500);
}
</script>

<template>
  <div class="shop-page page-width">
    <ShopFilters @change="debouncedHandleSortByFiltersUpdate" />
    <section class="catalog">
      <div class="catalog__header">
        <ShopSortBy @change="handleSortByFiltersUpdate" />
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
      <div v-else>Sorry, no items found</div>
      <div v-if="pageLoading && currentPage > 1" class="page-loader">
        <v-progress-circular
          color="black"
          indeterminate
          size="32"
        ></v-progress-circular>
      </div>
      <div v-else-if="filteredItems.length > 0" class="page-loader">
        <v-btn class="button_secondary" @click="loadNewPage">Load More</v-btn>
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
