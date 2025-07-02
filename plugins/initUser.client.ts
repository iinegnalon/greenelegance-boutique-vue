import { useUserStore } from '~/store/userStore';

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();

  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    try {
      const parsedUser = JSON.parse(userFromLocalStorage);

      if (parsedUser && !parsedUser.address) {
        parsedUser.address = {
          street: '',
          city: '',
          zip: '',
        };
      }

      userStore.setUser(parsedUser);
    } catch {
      localStorage.removeItem('user');
    }
  }
});
