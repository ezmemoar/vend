export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();

  const refreshToken = useCookie("refresh_token", {
    maxAge: 60 * 60 * 48,
  });

  const token = useCookie("token", {
    maxAge: 60 * 60 * 24,
  });

  const isAuthenticated = () => token.value;

  const setUser = (payload: User) => {
    const newPayload = { ...payload };
    user.value = { ...user.value, ...newPayload };
  };

  const clearData = () => {
    user.value = undefined;
    refreshToken.value = undefined;
    token.value = undefined;
  };

  return { user, refreshToken, token, isAuthenticated, setUser, clearData };
});
