import { object, string } from "yup";

export const getCalons = () => {
  const options = ref({});
  const query = ref({
    page: 1,
    size: 10,
    sort: "DESC",
    search: null,
    election_uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api("/data/candidate/list/", {
      method: "get",
      query: query.value,
      ...options.value,
    });

  return { query, options, fetcher };
};

export const getCalon = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/candidate/detail/${params.value.uid}/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const postCalon = () => {
  const options = ref({});
  const state = ref({
    election_uid: null,
    name: null,
    number: null,
    picture: null,
  });

  const schema = object({
    election_uid: string().required("PILKADA harus diisi"),
    name: string().required("Nama calon harus diisi"),
    number: string().required("Nomor Urut harus diisi"),
    picture: string().required("Foto calon harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/candidate/create/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const updateCalon = () => {
  const options = ref({});
  const state = ref({
    uid: null,
    name: null,
  });

  const schema = object({
    uid: string().required("PILKADA harus diisi"),
    name: string().required("Nama calon harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/candidate/update/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const deleteCalon = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/candidate/delete/${params.value.uid}/`, {
      method: "delete",
      ...options.value,
    });

  return { params, options, fetcher };
};
