const createHeadersPayload = (
  headers: HeadersInit,
  val: { [index: string]: any }
) => {
  const keys = Object.keys(val);

  keys.forEach((v) => {
    if (Array.isArray(headers)) {
      headers.push([v, val[v]]);
    } else if (headers instanceof Headers) {
      headers.set(v, val[v]);
    } else {
      headers[v] = val[v];
    }
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  const store = useAuthStore();
  const toast = useToast();
  const runtimeConf = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: runtimeConf.public.apiUrl,
    onRequest({ request, options, error }) {
      const headers = (options.headers ||= {});
      const newHeaders: { [index: string]: any } = {};

      if (store.token) {
        newHeaders["Authorization"] = `Bearer ${store.token}`;
      }

      createHeadersPayload(headers, newHeaders);
    },
    onRequestError({ error }) {
      toast.add({
        title: error?.message,
        color: "danger",
        icon: "i-heroicons-exclamation-circle",
      });

      throw error;
    },
    async onResponseError({ response, error }) {
      toast.add({
        title: response._data?.errors[0]?.detail || error?.message,
        color: "danger",
        icon: "i-heroicons-exclamation-circle",
      });

      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
