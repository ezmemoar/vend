<script setup lang="ts">
const props = defineProps<{
  data: TableData[];
  columns: TableColumn[];
  loading: boolean;
  ui: object;
  count: number;
  totalPage: number;
}>();

const route = useRoute();

const { params, sizeOptions } = usePagination();

const calculateRowNumber = (i: number) => startPage.value + i;

const columnsKey = computed(() => props.columns.map((val) => val.key));

const startPage = computed(
    () => 1 + params.value.page_size * (params.value.page - 1)
);

const endPage = computed(() => {
  const total = params.value.page_size * params.value.page;
  return props.count && total > props.count ? props.count : total;
});

const changePage = () =>
  navigateTo({
    query: { ...(route.query ?? {}), ...params.value },
  });

const nextPage = () => {
  params.value.page++;
  changePage();
};

const prevPage = () => {
  params.value.page--;
  changePage();
};

watch(
  () => params.value.page_size,
  () => {
    params.value.page = 1;
    changePage();
  }
);
</script>

<template>
  <div
    class="rounded shadow border border-slate-200 dark:border-slate-800 pb-3"
  >
    <UTable :rows="loading ? [] : data" :columns :ui :loading>
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

    <div
      class="flex max-sm:flex-col items-center border-t border-slate-200 dark:border-slate-800"
    >
      <div class="sm:basis-1/3 sm:w-1/3"></div>
      <div class="sm:basis-1/3 sm:w-1/3 px-5 mt-2 text-center">
        Show {{ startPage }} {{ endPage ? `of ${endPage}` : "" }}
        {{ count ? `from ${count} data` : "" }}
      </div>

      <div
        class="p-3 flex justify-end items-center gap-3 sm:basis-1/3 sm:w-1/3"
      >
        <USelect :options="sizeOptions" v-model="params.page_size" />
        <UButton
          :disabled="params.page == 1 || totalPage === 0 || loading"
          @click="prevPage"
        >
          Prev
        </UButton>
        <UButton
          :disabled="params.page == totalPage || totalPage === 0 || loading"
          @click="nextPage"
        >
          Next
        </UButton>
      </div>
    </div>
  </div>
</template>

