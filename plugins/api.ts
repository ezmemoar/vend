const createHeadersPayload = (headers: HeadersInit, val: any) => {
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

const handleBodyData = (options: any, headers: any) => {
  if (options.body) {
    let contentType = headers["content-type"] || headers["Content-Type"];

    if (contentType === "application/x-www-form-urlencoded")
      options.body = new URLSearchParams(options.body);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConf = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: runtimeConf.public.apiUrl,
    onRequest: ({ request, options, error }) => {
      const headers: any = (options.headers ||= {});
      const headersVal: any = {};

      createHeadersPayload(headers, headersVal);

      handleBodyData(options, headers);
    },
    onResponseError: async ({ response }) => {
      if (response.status === 401) {
        // await nuxtApp.runWithContext(() => navigateTo("/login"));
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
