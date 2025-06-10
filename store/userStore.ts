import { defineStore } from 'pinia';
import type { UserDto } from '~/models/dto/userDto';
import { waitFor } from '~/utils';

interface UserStore {
  user: UserDto | null;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStore => ({
    user: null,
  }),
  actions: {
    setUser(user: UserDto) {
      this.user = user;

      this.updateLocalStorage();
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },

    async logout() {
      await waitFor();
      this.clearUser();
    },

    updateLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user));
    },
  },
});
