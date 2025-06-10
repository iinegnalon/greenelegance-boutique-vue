import { defineStore } from 'pinia';
import type { ShopItemDto } from '~/models/dto/shopItemDto';
import type { Color } from '~/models/enums/color';
import type { Size } from '~/models/enums/size';

interface CartItem {
  product: ShopItemDto;
  quantity: number;
  selectedColor: Color | null;
  selectedSize: Size | null;
}

interface CartStore {
  items: CartItem[];
}

export const useCartStore = defineStore({
  id: 'cart',
  state: (): CartStore => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    totalPrice(state) {
      return state.items.reduce((sum, item) => {
        const price = item.product.discountedPrice ?? item.product.price;
        return sum + price * item.quantity;
      }, 0);
    },
  },
  actions: {
    setCart(items: CartItem[]) {
      this.items = items;

      this.updateLocalStorage();
    },

    addToCart(
      product: ShopItemDto,
      selectedColor: Color | null,
      selectedSize: Size | null,
      quantity = 1,
    ) {
      const existing = this.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize,
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          product,
          quantity,
          selectedColor,
          selectedSize,
        });
      }

      this.updateLocalStorage();
    },

    removeFromCart(index: number, removeAll = false) {
      if (index < 0 || index >= this.items.length) return;

      if (removeAll || this.items[index].quantity <= 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity--;
      }

      this.updateLocalStorage();
    },

    clearCart() {
      this.items = [];

      localStorage.removeItem('cart');
    },

    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
  },
});
