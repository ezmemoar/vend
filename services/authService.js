import { object, string } from "yup";

export const postLogin = () => {
  const runtimeConf = useRuntimeConfig();

  const options = ref({});
  const state = ref({
    username: "admin",
    password: "wandering872",
    grant_type: "password",
  });

  const schema = object({
    username: string().required("Username wajib diisi"),
    password: string().required("Password wajib diisi"),
  });

  const basicAuth = btoa(
    `${runtimeConf.public.clientId}:${runtimeConf.public.clientSecret}`
  );

  const fetcher = () =>
    useNuxtApp().$api("/user/login/", {
      body: state.value,
      method: "post",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const getProfile = () => {
  const options = ref({});
  const fetcher = () => useNuxtApp().$api("/user/profile/", options.value);
  return { options, fetcher };
};
