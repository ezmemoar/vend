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

  const setUser = (payload) => {
    const newPayload = { ...payload };

    console.log(newPayload);

    if (newPayload.expires_in) {
      const d = new Date();
      const milimeter = 1000;
      newPayload.expired_at = new Date(
        d.getTime() + +newPayload.expires_in * milimeter
      );
    }

    user.value = { ...user.value, ...payload };
  };

  const clearUser = () => (user.value = null);

  return { user, setUser, clearUser };
});
