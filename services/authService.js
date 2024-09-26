import { object, string } from "yup";

export const postLogin = (opts = {}, manual = true) => {
  const runtimeConf = useRuntimeConfig();

  const state = ref({
    username: "admins",
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

  const fetcher = useApi(
    "/user/login/",
    {
      method: "post",
      body: state.value,
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...opts,
    },
    manual
  );

  return { state, schema, ...fetcher };
};

export const getProfile = (opts = {}, manual = false) =>
  useApi("/user/profile/", opts, manual);
