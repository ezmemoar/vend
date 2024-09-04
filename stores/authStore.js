export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage("auth", {});

  const setUser = (payload) => {
    user.value = payload;
  };

  const clearUser = () => {};

  return { user, setUser, clearUser };
});
