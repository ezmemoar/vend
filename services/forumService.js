import { object, string } from "yup";

export const getForums = () => {
  const options = ref({});
  const query = ref({
    page: 1,
    size: 10,
    sort: "DESC",
    search: null,
    status: null,
    type: null,
  });

  const fetcher = () =>
    useNuxtApp().$api("/data/news/list/", {
      method: "get",
      query: query.value,
      ...options.value,
    });

  return { query, options, fetcher };
};

export const getForumsForUser = () => {
  const options = ref({});
  const query = ref({
    page: 1,
    size: 10,
    sort: "DESC",
    search: null,
    status: null,
    type: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/user/news/list/`, {
      method: "get",
      query: query.value,
      ...options.value,
    });

  return { params, options, fetcher };
};

export const getForum = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/news/detail/${params.value.uid}/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const postForum = () => {
  const options = ref({});
  const state = ref({
    title: null,
    date: null,
    type: null,
    url: null,
    image: null,
    status: null,
    content: null,
    response: null,
  });

  const schema = object({
    title: string().required("Judul berita harus diisi"),
    date: string().required("Tanggal berita harus diisi"),
    type: string().required("Sumber media harus diisi"),
    url: string().required("Link sumber harus diisi"),
    image: string().required("Gambar harus diisi"),
    status: string().required("Sentimen berita harus diisi"),
    content: string().required("Isi berita harus diisi"),
    response: string().required("Cara menanggapi harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/news/create/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const updateForum = () => {
  const options = ref({});
  const state = ref({
    uid: null,
    title: null,
    date: null,
    type: null,
    url: null,
    image: null,
    status: null,
    content: null,
    response: null,
  });

  const schema = object({
    uid: string().required("UID harus diisi"),
    title: string().required("Judul berita harus diisi"),
    date: string().required("Tanggal berita harus diisi"),
    type: string().required("Sumber media harus diisi"),
    url: string().required("Link sumber harus diisi"),
    image: string().required("Gambar harus diisi"),
    status: string().required("Sentimen berita harus diisi"),
    content: string().required("Isi berita harus diisi"),
    response: string().required("Cara menanggapi harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/news/update/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const deleteForum = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/news/delete/${params.value.uid}/`, {
      method: "delete",
      ...options.value,
    });

  return { params, options, fetcher };
};
