<template>
  <div class="rounded shadow border border-slate-200 pb-3">
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
          <div class="flex flex-col items-center gap-5 w-full">
            <img src="~/assets/images/errors/404.png" class="w-40" alt="" />
            <div>Tidak ada data</div>
          </div>
        </slot>
      </template>
    </UTable>

    <div class="px-2 mt-2">
      Show {{ startPage }} of {{ endPage }}
      {{ count ? `from ${count} data` : "" }}
    </div>
    <div class="w-full p-3 rounded-b-full flex justify-between items-center">
      <div class="flex items-center gap-3">
        <UButton :disabled="params.page == 1 || loading" @click="prevPage">
          Prev
        </UButton>
        <UButton
          :disabled="params.page == totalPage || totalPage === 0 || loading"
          @click="nextPage"
        >
          Next
        </UButton>
        <USelect :options="sizeOptions" v-model="params.page_size" />
      </div>
      <div class="flex justify-end items-center">
        Page
        <template v-if="!totalPage">{{ params.page }}</template>
        <template v-else>
          <UTooltip
            :ui="{
              wrapper: 'w-[20%] px-2',
              background: 'bg-primary-600',
              color: 'text-white',
            }"
            text="tekan enter untuk pindah halaman"
            :popper="{ placement: 'top' }"
          >
            <UInput
              size="sm"
              :value="params.page"
              @keyup.enter="validatePage"
            />
          </UTooltip>
          from
          {{ totalPage }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  withSort: Boolean,
  data: Array,
  columns: Array,
  loading: Boolean,
  totalPage: Number,
  count: Number,
  ui: Object,
});

const toast = useToast();
const route = useRoute();
const {
  columnsKey,
  changePage,
  startPage,
  endPage,
  calculateRowNumber,
  validatePage,
  sizeOptions,
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
  const sizeOptions = [10, 15, 30, 50, 100];
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

  const validatePage = (e) => {
    if (e.target.value > props.totalPage) {
      return toast.add({ title: "Page tidak boleh melebihi maksimal" });
    }
    if (e.target.value < 1) {
      return toast.add({ title: "Page tidak boleh kosong atau minus" });
    }
    params.value.page = e.target.value;
    changePage();
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
    validatePage,
    sizeOptions,
    sort,
    params,
    nextPage,
    prevPage,
  };
}
</script>
