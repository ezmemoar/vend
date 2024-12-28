export const useAuthStore = defineStore("auth", () => {
  const credentials = useCookie<UserAuth | null>("auth");

  const isAuthenticated = () => {
    return (
      credentials.value &&
      !!credentials.value.access_token &&
      new Date(credentials.value.expired_at) > new Date()
    );
  };
  const setCredentials = (payload: UserAuth) => {
    const newPayload = { ...payload };

    if (newPayload.expires_in) {
      const d = new Date();
      const milimeter = 1000;
      newPayload.expired_at = new Date(
        d.getTime() + newPayload.expires_in * milimeter
      ).toString();
    }

    credentials.value = { ...credentials.value, ...newPayload };
  };

  const clearCredentials = () => (credentials.value = null);

  return { credentials, isAuthenticated, setCredentials, clearCredentials };
});
