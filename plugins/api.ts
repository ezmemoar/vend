const createHeadersPayload = (headers: HeadersInit, val: any) => {
  const keys = Object.keys(val);

  keys.forEach((v) => {
    if (Array.isArray(headers)) {
      headers.push([v, `Bearer ${val[v]}`]);
    } else if (headers instanceof Headers) {
      headers.set(v, `Bearer ${val[v]}`);
    } else {
      headers[v] = `Bearer ${val[v]}`;
    }
  })

};

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConf = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: runtimeConf.public.apiUrl,
    onRequest({ request, options, error }) {

      // if (session.value) {
      //   const headers = (options.headers ||= {});
      //   if (Array.isArray(headers)) {
      //     headers.push(["Authorization", `Bearer ${session.value?.token}`]);
      //   } else if (headers instanceof Headers) {
      //     headers.set("Authorization", `Bearer ${session.value?.token}`);
      //   } else {
      //     headers.Authorization = `Bearer ${session.value?.token}`;
      //   }
      // }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
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
