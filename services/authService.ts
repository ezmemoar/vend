import { object, string } from "yup";

export const postLogin = () => {
  const state = ref({
    username: "",
    password: "",
  });

  const schema = object({
    username: string().required("Username tidak boleh kosong"),
    password: string().required("Password tidak boleh kosong"),
  });

  const run = (options: FetchOptions = { method: "POST" }) =>
    useNuxtApp().$api<UserAuth>("/login", options);

  return { state, schema, run };
};

const asd = postLogin();
