export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage("auth", {
    access_token: "",
    expired_at: "",
    expires_in: "",
    token_type: "",
    scope: "",
    refresh_token: "",
    user_type: "",

    name: "",
    tps: "",
    village: "",
    elections: "",
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
