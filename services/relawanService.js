import { object, string } from "yup";

const createPayload = (v) => {
  const p = {
    uid: v.name,
    name: v.name,
    email: v.email,
    phone: v.phone,
    address: v.address,
    password: v.password,
    tps: v.tps,
  };
  if (v.uid) p.uid = v.uid;
  return p;
};

export const getRelawans = () => {
  const { filter: query } = useFilterStore();
  const options = ref({});

  const fetcher = () =>
    useNuxtApp().$api("/user/list/", {
      method: "get",
      query,
      ...options.value,
    });

  return { query, options, fetcher };
};

export const getRelawan = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/user/detail/${params.value.uid}/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const postRelawan = () => {
  const options = ref({});
  const state = ref({
    name: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    province: null,
    regency: null,
    district: null,
    village: null,
    tps: null,
  });

  const schema = object({
    name: string().required("Nama harus diisi"),
    email: string().required("Email harus diisi"),
    phone: string().required("Nomor HP harus diisi"),
    address: string().required("Alamat lengkap harus diisi"),
    password: string().required("Kata sandi diisi").min(8),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/user/create/`, {
      method: "post",
      body: createPayload(state.value),
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const updateRelawan = () => {
  const options = ref({});
  const state = ref({
    uid: null,
    name: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    province: null,
    regency: null,
    district: null,
    village: null,
    tps: null,
  });

  const schema = object({
    uid: string().required("UID harus diisi"),
    name: string().required("Nama harus diisi"),
    email: string().required("Email harus diisi"),
    phone: string().required("Nomor HP harus diisi"),
    address: string().required("Alamat lengkap harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/user/update/`, {
      method: "post",
      body: createPayload(state.value),
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const deleteRelawan = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/user/delete/${params.value.uid}/`, {
      method: "delete",
      ...options.value,
    });

  return { params, options, fetcher };
};
