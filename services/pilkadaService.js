import { array, number, object, string } from "yup";

export const getPilkadas = () => {
  const { filter: query } = useFilterStore();
  const options = ref({});

  const fetcher = () =>
    useNuxtApp().$api("/data/election/list/", {
      method: "get",
      query,
      ...options.value,
    });

  return { query, options, fetcher };
};

export const getPilkada = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/election/detail/${params.value.uid}/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const postPilkada = () => {
  const options = ref({});
  const state = ref({
    name: null,
    type: null,
    province: null,
    regency: null,
  });

  const schema = object({
    name: string().required("Nama PILKADA harus diisi"),
    type: string().required("Level PILKADA harus diisi"),
    province: string().required("Provinsi harus diisi"),
    regency: string()
      .nullable()
      .test(
        "is-level-regency",
        "Kabupaten / kota harus diisi",
        (v) =>
          state.value.type !== "2" ||
          (state.value.type === "2" && (v !== null || v !== ""))
      ),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/election/create/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const updatePilkada = () => {
  const options = ref({});
  const state = ref({
    uid: null,
    name: null,
    type: null,
    province: null,
    regency: null,
  });

  const schema = object({
    uid: string().required("UID harus diisi"),
    name: string().required("Nama PILKADA harus diisi"),
    type: string().required("Level PILKADA harus diisi"),
    province: string().required("Provinsi harus diisi"),
    regency: string()
      .nullable()
      .test(
        "is-level-regency",
        "Kabupaten / kota harus diisi",
        (v) =>
          state.value.type !== "2" ||
          (state.value.type === "2" && (v !== null || v !== ""))
      ),
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/election/update/`, {
      method: "post",
      body: state.value,
      ...options.value,
    });

  return { state, schema, options, fetcher };
};

export const deletePilkada = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/election/delete/${params.value.uid}/`, {
      method: "delete",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const getPilkadaResults = () => {
  const options = ref({});
  const params = ref({
    uid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/data/election/${params.value.uid}/result/`, {
      method: "get",
      ...options.value,
    });

  return { params, options, fetcher };
};

export const getPilkadaResult = () => {
  const options = ref({});
  const params = ref({
    uid: null,
    resultUid: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(
      `/data/election/${params.value.uid}/result/${params.value.resultUid}/`,
      {
        method: "get",
        ...options.value,
      }
    );

  return { params, options, fetcher };
};

export const updatePilkadaResult = () => {
  const options = ref({});
  const params = ref({
    uid: null,
    resultUid: null,
  });
  const state = ref({
    result: [],
    status: null,
    lembar_saksi: null,
  });

  const schema = object({
    // result: array(
    //   object({
    //     election_id: string().required("UID election harus diisi"),
    //     total_votes: number().typeError("Total votes harus diisi"),
    //   })
    // ),
    // status: string().required("Status harus diisi"),
    // lembar_saksi: string().required("Lembar saksi harus diisi"),
  });

  const fetcher = () =>
    useNuxtApp().$api(
      `/data/election/${params.value.uid}/result/${params.value.resultUid}/`,
      {
        method: "put",
        body: {
          status: state.value.status,
          lembar_saksi: state.value.lembar_saksi,
          result: state.value.result.map(({ candidate_id, total_votes }) => ({
            candidate_id,
            total_votes,
          })),
        },
        ...options.value,
      }
    );

  return { params, state, schema, options, fetcher };
};
