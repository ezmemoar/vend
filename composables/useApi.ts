import { useAuthStore } from "../stores/authStore";

export function useApi<T>(
  url: string | (() => string),
  options?: any,
  manual = false
) {
  const authStore = useAuthStore();

  let manualParams = {};
  if (manual) {
    manualParams = {
      immediate: false,
      watch: false,
      lazy: true,
      server: false,
    };
  }

  let headers = { authorization: "" };
  if (authStore.user.access_token) {
    headers.authorization = `Bearer ${authStore.user.access_token}`;
  }

  return useFetch(url, {
    headers,
    ...options,
    ...manualParams,
    $fetch: useNuxtApp().$api,
  });
}

// export function useApi<T>(
//   url: string | (() => string),
//   options: any,
//   manual = false
// ) {
//   const authStore = useAuthStore();
//   let manualParams = {};
//   if (manual) {
//     manualParams = {
//       immediate: false,
//       watch: false,
//       lazy: true,
//       server: false,
//     };
//   }


//   headers = { ...headers, ...options?.headers };
//   delete options.headers;

//   return useAsyncData(
//     () => useNuxtApp().$api(url, { headers, ...options }),
//     {
//       ...manualParams,
//     }
//   );
// }

const handleAuthorizationData = (headers: any, val: any) => {
  const authStore = useAuthStore();
  const authorization = headers?.Authorization || headers?.authorization;

  // if (authStore.user.access_token && !authorization) {
  //   val.Authorization = `Bearer ${authStore.user.access_token}`;
  // }
};
