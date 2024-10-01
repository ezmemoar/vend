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
        <UButton
          color="white"
          icon="i-heroicons-funnel-solid"
          label="Filters"
        />
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
        :disabled="filter.page == 1 || loading"
        @click="prevPage"
      >
        Previous
      </UButton>
      <div>Page {{ filter.page }} of {{ totalPage }}</div>
      <UButton
        color="white"
        :disabled="filter.page == totalPage || totalPage === 0 || loading"
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
  filter,
  changePage: changeFilter,
  nextPage,
  prevPage,
} = useFilterStore();
const { columnsKey, changePage, calculateRowNumber, sort, params } =
  useLocalTable();

watch(
  sort,
  (val) => {
    const text = `${val.direction === "asc" ? "" : "-"}${val.column}`;
    filter.sort = text;
    changePage();
  },
  { deep: true }
);

watch(
  () => filter.size,
  () => {
    filter.page = 1;
    changeFilter();
  }
);

function useLocalTable() {
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

    changeFilter();
  };

  const lastRowPage = computed(() => 1 + filter.size * (filter.page - 1));
  const calculateRowNumber = (i) => lastRowPage.value + i;

  return {
    columnsKey,
    changePage,
    calculateRowNumber,
    sort,
  };
}
</script>
