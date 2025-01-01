export const usePagination = () => {
  const route = useRoute();

  const sizeOptions = [10, 15, 30, 50, 100];

  const params = ref({
    page: route.query?.page ? +route.query.page : 1,
    page_size: route.query?.page_size ? +route.query.page_size : 15,
    sort: route.query?.sort ? route.query.sort : "DESC",
  });

  return { params, sizeOptions };
}