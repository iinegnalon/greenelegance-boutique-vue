<script lang="ts" setup>
import { useFavoritesStore } from '~/store/favoritesStore';
import ShopItemCard from '~/components/ShopItemCard.vue';
import type { ShopItemDto } from '~/models/dto/shopItemDto';

const favoritesStore = useFavoritesStore();

const emit = defineEmits(['favorite']);

const favorites = ref<ShopItemDto[]>([]);

onMounted(() => {
  favorites.value = [...favoritesStore.itemsWithInfo];
});

function handleFavorite(value: boolean, shopItem: ShopItemDto) {
  if (value) {
    favoritesStore.addToFavorites(shopItem.id);
    emit('favorite', true, shopItem);
    return;
  }

  favoritesStore.removeItem(shopItem.id);
  emit('favorite', false, shopItem);
}
</script>

<template>
  <div class="profile-page__section">
    <h2 class="profile-page__section-title">Favorites</h2>

    <div v-if="favorites.length > 0" class="profile-page__favorites">
      <ShopItemCard
        v-for="item in favorites"
        :key="item.id"
        :shop-item="item"
        @favorite="handleFavorite"
      />
    </div>
    <div v-else>You haven't added any items to your favorites yet</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

// Mobile
.profile-page__favorites {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 12px;
}

// Tablet
@media screen and (min-width: $tablet-breakpoint) {
  .profile-page__favorites {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 16px;
  }
}

// Desktop
@media screen and (min-width: $desktop-breakpoint) {
  .profile-page__favorites {
    grid-template-columns: repeat(auto-fill, minmax(216px, 1fr));
    grid-gap: 20px;
  }
}
</style>
