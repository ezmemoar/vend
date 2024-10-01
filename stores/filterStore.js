export const useFilterStore = defineStore("filter", () => {
  const route = useRoute();
  const filter = ref({
    page: route.query?.page ? +route.query.page : 1,
    size: route.query?.size ? +route.query.size : 15,
    sort: route.query?.sort ? route.query.sort : "DESC",
    search: route.query?.search ? route.query.search : "",
  });

  // watch(
  //   () => route.query,
  //   (v) => {
  //     filter.value = {
  //       page: v?.page ? +v.page : 1,
  //       size: v?.size ? +v.size : 1,
  //       sort: v?.sort ? v.sort : "DESC",
  //       search: v?.search ? v.search : "",
  //     };
  //   }
  // );

  const resetFilter = () =>
    (filter.value = {
      page: 1,
      size: 15,
      sort: "DESC",
      search: "",
    });

  const changePage = (payload = {}) => {
    navigateTo({
      query: { ...(route.query ?? {}), ...filter.value, ...payload },
    });
  };

  const nextPage = () => {
    filter.value.page++;
    changePage();
  };

  const prevPage = () => {
    filter.value.page--;
    changePage();
  };

  return { filter, resetFilter, changePage, nextPage, prevPage };
});
