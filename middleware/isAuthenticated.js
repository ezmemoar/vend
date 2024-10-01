export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated()) return;

  authStore.clearUser();
  return navigateTo("/");
});
