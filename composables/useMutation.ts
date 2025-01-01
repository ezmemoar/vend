import type { UseFetchOptions } from "nuxt/app";

export const useMutation = <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) => {
  return useFetch(url, {
    method: "post",
    immediate: false,
    watch: false,
    ...options,
    $fetch: useNuxtApp().$api,
  });
};
