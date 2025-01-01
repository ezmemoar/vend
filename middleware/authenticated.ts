export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated()) return;

  authStore.clearData();
  return navigateTo("/");
});
