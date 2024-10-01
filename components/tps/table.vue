<template>
  <BaseTablePagination
    :label
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
    :total-page="data?.total_page"
    :count="data?.count"
  >
    <template #province-data="{ row }">
      {{ row.province.name }}
    </template>
    <template #regency-data="{ row }">
      {{ row.regency.name }}
    </template>
    <template #district-data="{ row }">
      {{ row.district.name }}
    </template>
    <template #village-data="{ row }">
      {{ row.village.name }}
    </template>
    <template #relawan-data="{ row }">
      <BaseText class="font-semibold">{{ row.relawan.name }}</BaseText>
      <BaseText class="text-gray-600">{{ row.relawan.email }}</BaseText>
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
import { getTpses } from "~/services/tpsService";

const props = defineProps({
  label: String,
  redirectAfterEdit: String,
  uid: {
    type: String,
    required: false,
  },
});

const { filter } = useFilterStore();
const { query, fetcher } = getTpses();
if (props.uid) query.value.election_uid = props.uid;
const { data, status, execute } = useAsyncData("tps", fetcher);
watch(filter, execute);

const columns = ref([]);

const createLink = (uid) => {
  let text = `/dashboard/tps/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Provinsi", key: "province" });
  columns.value.push({ label: "Kabupaten / Kota", key: "regency" });
  columns.value.push({ label: "Kelurahan", key: "village" });
  columns.value.push({ label: "Kecamatan", key: "district" });
  columns.value.push({ label: "Nomor TPS", key: "number" });
  columns.value.push({ label: "Nama Relawan", key: "relawan" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
