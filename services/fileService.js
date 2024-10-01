export const getFile = () => {
  const options = ref({});
  const query = ref({
    file: null,
  });

  const fetcher = () =>
    useNuxtApp().$api(`/user/get-file/`, {
      method: "get",
      query: query.value,
      ...options.value,
    });

  return { options, query, fetcher };
};

export const postUpload = () => {
  const options = ref({});
  const state = ref({
    file: null,
    path: null,
  });

  const fetcher = () => {
    const body = new FormData();
    body.append("file", state.value.file);
    body.append("path", state.value.path);

    return useNuxtApp().$api(`/user/upload-form/`, {
      method: "post",
      body,
      ...options.value,
    });
  };

  return { options, state, fetcher };
};
