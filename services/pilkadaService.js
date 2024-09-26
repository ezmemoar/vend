export const getPilkada = (opts = {}, manual = false) => {
  const query = ref({
    page: 1,
    size: 10,
    sort: "DESC",
    search: "",
  });

  const fetcher = useApi(
    "/data/election/list/",
    { query: query.value, ...opts },
    manual
  );

  return { query, ...fetcher };
};
