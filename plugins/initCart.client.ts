import { useCartStore } from '~/store/cartStore';

export default defineNuxtPlugin(() => {
  const cartStore = useCartStore();

  const cartFromLocalStorage = localStorage.getItem('cart');
  if (cartFromLocalStorage) {
    try {
      const parsedCart = JSON.parse(cartFromLocalStorage);
      cartStore.setCart(parsedCart);
    } catch (e) {
      localStorage.removeItem('cart');
    }
  }
});
