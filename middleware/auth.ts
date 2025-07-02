import { useUserStore } from '~/store/userStore';

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (process.client && !userStore.user) {
    localStorage.setItem('lastVisitedPath', to.fullPath);
    return navigateTo('/login');
  }
});
