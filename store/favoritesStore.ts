import { defineStore } from 'pinia';
import type { ShopItemDto } from '~/models/dto/shopItemDto';

interface FavoritesStore {
  items: string[];
}

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: (): FavoritesStore => ({
    items: [] as string[],
  }),
  getters: {
    totalItems(state) {
      return state.items?.length ?? 0;
    },
    itemsWithInfo(state) {
      const items: ShopItemDto[] = [];

      state.items.forEach((item) => {
        const shopItem = fakeDatabase.shopItems.find(
          (shopItem) => shopItem.id === item,
        );
        if (shopItem) {
          items.push(shopItem);
        }
      });

      return items;
    },
  },
  actions: {
    setFavorites(items: string[]) {
      this.items = items;

      this.updateLocalStorage();
    },

    addToFavorites(productId: string) {
      const existing = this.items.find((item) => item === productId);

      if (!existing) {
        this.items.push(productId);
      }

      this.updateLocalStorage();
    },

    removeItem(productId: string) {
      const existing = this.items.find((item) => item === productId);

      if (existing) {
        this.items = this.items.filter((item) => item !== productId);
      }

      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items));
    },
  },
});
