<template>
  <div class="rounded shadow border border-slate-200 pb-3">
    <div class="flex items-center justify-between py-3 px-5">
      <BaseText el="h2" type="subtitle">{{ label }}</BaseText>
      <div class="flex items-center gap-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search"
        />
        <UButton color="white" icon="i-heroicons-funnel-solid" label="Filters" />
        <slot name="extra-button" />
      </div>
    </div>

    <UTable v-model:sort="sort" :rows="data" :columns :ui :loading>
      <template #no-data="{ index }">
        {{ calculateRowNumber(index) }}.
      </template>

      <template
        v-for="(val, key) in columnsKey.filter((e) => e !== 'no')"
        #[`${val}-data`]="{ row, index }"
      >
        <slot :key :index :row :name="`${val}-data`">{{ row[val] }}</slot>
      </template>

      <template #empty-state>
        <slot name="empty">
          <div class="flex flex-col items-center gap-5 w-full py-20">
            <img src="~/assets/images/errors/404.png" class="w-40" alt="" />
            <div>Tidak ada data</div>
          </div>
        </slot>
      </template>
    </UTable>

    <div
      class="w-full py-3 px-5 rounded-b-full flex justify-between items-center"
    >
      <UButton
        color="white"
        :disabled="params.page == 1 || loading"
        @click="prevPage"
      >
        Previous
      </UButton>
      <div>Page {{ startPage }} of {{ endPage }}</div>
      <UButton
        color="white"
        :disabled="params.page == totalPage || totalPage === 0 || loading"
        @click="nextPage"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  withSort: Boolean,
  data: Array,
  columns: Array,
  loading: Boolean,
  totalPage: Number,
  count: Number,
  ui: Object,
});

const route = useRoute();
const {
  columnsKey,
  changePage,
  startPage,
  endPage,
  calculateRowNumber,
  sort,
  params,
  nextPage,
  prevPage,
} = useLocalTable();

watch(
  sort,
  (val) => {
    const text = `${val.direction === "asc" ? "" : "-"}${val.column}`;
    params.value.sort = text;
    changePage();
  },
  { deep: true }
);

watch(
  () => params.value.page_size,
  () => {
    params.value.page = 1;
    changePage();
  }
);

watch(
  () => params.value.page,
  (val) => (params.value.page = val)
);

function useLocalTable() {
  const params = ref({
    page: route.query?.page ? +route.query.page : 1,
    page_size: route.query?.page_size ? +route.query.page_size : 15,
    sort: route.query?.sort ? route.query.sort : "",
  });
  const sort = ref({
    column: route.query.sort?.split("-").join("") || "",
    direction: route.query?.sort
      ? route.query.sort?.includes("-")
        ? "desc"
        : "asc"
      : "",
  });

  const columnsKey = computed(() => props.columns.map((val) => val.key));

  const changePage = () => {
    const newParams = { ...params.value };

    if (!props.withSort) {
      delete newParams.sort;
    }

    navigateTo({
      query: { ...(route.query ?? {}), ...params.value },
    });
  };

  const startPage = computed(
    () => 1 + params.value.page_size * (params.value.page - 1)
  );

  const endPage = computed(() => {
    const total = params.value.page_size * params.value.page;
    return props.count && total > props.count ? props.count : total;
  });

  const nextPage = () => {
    params.value.page++;
    changePage();
  };

  const prevPage = () => {
    params.value.page--;
    changePage();
  };

  const calculateRowNumber = (i) => startPage.value + i;

  return {
    columnsKey,
    changePage,
    startPage,
    endPage,
    calculateRowNumber,
    sort,
    params,
    nextPage,
    prevPage,
  };
}
</script>
