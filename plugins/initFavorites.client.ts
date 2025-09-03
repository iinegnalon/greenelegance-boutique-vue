import { useFavoritesStore } from '~/store/favoritesStore';

export default defineNuxtPlugin(() => {
  const favoritesStore = useFavoritesStore();

  const favoritesFromLocalStorage = localStorage.getItem('favorites');
  if (favoritesFromLocalStorage) {
    try {
      const parsedFavorites = JSON.parse(favoritesFromLocalStorage);
      favoritesStore.setFavorites(parsedFavorites);
    } catch (e) {
      localStorage.removeItem('favorites');
    }
  }
});
