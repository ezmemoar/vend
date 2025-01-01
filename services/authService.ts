import type { UseFetchOptions } from "#app";
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

  const run = (options?: UseFetchOptions<string>) =>
    useMutation<string>("/login", {
      body: state,
      ...options,
    });

  return { state, schema, run };
};
