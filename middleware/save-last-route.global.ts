export default defineNuxtRouteMiddleware((to) => {
  const ignoredPaths = ['/login', '/signup'];

  if (process.client && !ignoredPaths.includes(to.path)) {
    localStorage.setItem('lastVisitedPath', to.fullPath);
  }
});
