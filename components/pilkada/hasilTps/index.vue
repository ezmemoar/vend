<template>
  <BaseTablePagination
    label="Hasil Pemilihan TPS"
    :data="data?.data"
    :columns
    :loading="status === 'pending' || status === 'idle'"
  >
    <template #tps-data="{ row }">
      {{ formatTrailingNumber(row.tps.number) }}
    </template>
    <template #regency-data="{ row }">
      {{ row.regency.name }}
    </template>
    <template #village-data="{ row }">
      {{ row.village.name }}
    </template>
    <template #created_at-data="{ row }">
      {{ formatDate(row.created_at, true) }}
    </template>
    <template #status-data="{ row }">
      <BaseStatusBadge
        :label="row.status.name"
        :type="setStatus(row.status.id)"
        variant="soft"
      />
    </template>
    <template #lembar_saksi-data="{ row }">
      <PilkadaHasilTpsPersentasePemilihan :result-uid="row.uid" />
    </template>
    <template #action-data="{ row }">
      <UButton
        :to="`/dashboard/pilkada/${route.params.uid}/hasil-tps/${row.uid}`"
        variant="ghost"
        color="slate"
        icon="i-heroicons-eye-solid"
      />
    </template>
  </BaseTablePagination>
</template>

<script setup>
import { getPilkadaResults } from "~/services/pilkadaService";

const route = useRoute();

const { params, fetcher } = getPilkadaResults();
params.value.uid = route.params.uid;
const { data, status } = useAsyncData(fetcher);

const columns = [
  {
    label: "Nomor TPS",
    key: "tps",
  },
  {
    label: "Kabupaten / Kota",
    key: "regency",
  },
  {
    label: "Kelurahan",
    key: "village",
  },
  {
    label: "Date Uploaded",
    key: "created_at",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Persentase Pemilihan & Lembar Saksi",
    key: "lembar_saksi",
  },
  {
    label: "Action",
    key: "action",
  },
];

const setStatus = (val) => ({ 1: "warning", 2: "success", 3: "danger" }[val]);
</script>
