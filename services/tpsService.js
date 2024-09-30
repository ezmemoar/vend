import { object, string } from "yup";

export const getTpses = () => {
  const options = ref({});
  const query = ref({
    page: 1,
    size: 10,
    sort: "DESC",
    search: null,
    election_uid: null,
    village_id: null,
  });

  const fetcher = () =>
    useNuxtApp().$api("/data/tps/list/", {
      method: "get",
      query: query.value,
      ...options.value,
    });

  return { query, options, fetcher };
};

export const getTps = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/tps/detail/${params.value.uid}/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const updateTps = () => {
  const options = ref({});
  const state = ref({
    uid: null,
    province: null,
    regency: null,
    district: null,
    village: null,
    number: null,
    name: null,
  });

  const schema = object({
    uid: string().required("UID harus diisi"),
    name: string().required("Nama relawan harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/tps/update/`, {
      method: "post",
      body: (({uid, name}) => ({uid, name}))(state.value),
      ...options.value,
    });

  return { state, schema, options, fetcher };
};
