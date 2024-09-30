export const getProvinces = () => {
  const options = ref({});

  const fetcher = () =>
    useNuxtApp().$api("/master/provinces/", {
      method: "get",
      ...options.value,
    });

  return { options, fetcher };
};

export const getRegencies = () => {
  const options = ref({});
  const params = ref({
    provinceId: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(
      `/master/provinces/${params.value.provinceId}/regencies/`,
      {
        method: "get",
        ...options.value,
      }
    );

  return { params, options, fetcher };
};

export const getDistricts = () => {
  const options = ref({});
  const params = ref({
    provinceId: null,
    regencyId: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(
      `/master/provinces/${params.value.provinceId}/regencies/${params.value.regencyId}/districts/`,
      {
        method: "get",
        ...options.value,
      }
    );

  return { params, options, fetcher };
};

export const getVillages = () => {
  const options = ref({});
  const params = ref({
    provinceId: null,
    regencyId: null,
    districtId: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(
      `/master/provinces/${params.value.provinceId}/regencies/${params.value.regencyId}/districts/${params.value.districtId}/villages/`,
      {
        method: "get",
        ...options.value,
      }
    );

  return { params, options, fetcher };
};
