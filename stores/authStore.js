export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage("auth", {
    access_token: null,
    expired_at: null,
    expires_in: null,
    token_type: null,
    scope: null,
    refresh_token: null,
    user_type: null,

    name: null,
    tps: null,
    village: null,
    elections: null,
  });

  const isAuthenticated = () =>
    !!user.value.access_token && new Date(user.value.expired_at) > new Date();

  const setUser = (payload) => {
    const newPayload = { ...payload };

    if (newPayload.expires_in) {
      const d = new Date();
      const milimeter = 1000;
      newPayload.expired_at = new Date(
        d.getTime() + +newPayload.expires_in * milimeter
      ).toString();
    }

    console.log(newPayload);

    user.value = { ...user.value, ...newPayload };
  };

  const clearUser = () => (user.value = null);

  return { user, setUser, clearUser, isAuthenticated };
});
