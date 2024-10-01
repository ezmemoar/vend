<template>
  <BaseTablePagination
    :label
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
    :total-page="data?.total_page"
    :count="data?.count"
  >
    <template #extra-button>
      <slot name="extra-button" />
    </template>
    <template #created_at-data="{ row }">
      {{ formatDate(row.created_at, true) }}
    </template>
    <template #number-data="{ row }">
      {{ formatTrailingNumber(row.number) }}
    </template>
    <template #picture-data="{ row }">
      <UAvatar :src="row.picture" size="lg" :ui="{ rounded: 'object-cover' }" />
    </template>
    <template #quick_count_result-data="{ row }">
      {{ row.quick_result || 0 }}%
    </template>
    <template #real_count_result-data="{ row }">
      {{ row.real_result || 0 }}%
    </template>
    <template #action-data="{ row }">
      <UButton
        :to="createLink(row.uid)"
        variant="ghost"
        color="slate"
        icon="i-heroicons-pencil"
      />
    </template>
  </BaseTablePagination>
</template>

<script setup>
import { getCalons } from "~/services/calonService";

const props = defineProps({
  label: String,
  redirectAfterEdit: String,
  // type: calon, pilkada
  listType: {
    type: String,
    default: "calon",
  },
  uid: {
    type: String,
    required: false,
  },
});

const { filter } = useFilterStore();
const { query, fetcher } = getCalons();
if (props.uid) query.value.election_uid = props.uid;
const { data, status, execute } = useAsyncData("calon", fetcher);
watch(filter, execute);

const columns = ref([]);

const createLink = (uid) => {
  let text = `/dashboard/calon/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};


onMounted(() => {
  columns.value.push({ label: "Date Created", key: "created_at" });

  if (props.listType === "calon") {
    columns.value.push({ label: "PILKADA", key: "election_name" });
  }

  columns.value.push({ label: "Nomor Urut", key: "number" });
  columns.value.push({ label: "Nama Calon", key: "name" });
  columns.value.push({ label: "Foto", key: "picture" });

  if (props.listType === "pilkada") {
    columns.value.push({
      label: "Hasil Quick Count",
      key: "quick_count_result",
    });
    columns.value.push({ label: "Hasil Real Count", key: "real_count_result" });
  }

  columns.value.push({ label: "Action", key: "action" });
});
</script>
