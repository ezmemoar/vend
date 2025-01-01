export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated()) return;

  return navigateTo("/dashboard");
});
