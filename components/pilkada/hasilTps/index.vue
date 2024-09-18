<template>
  <BaseTablePagination label="Hasil Pemilihan TPS" :data :columns>
    <template #date_uploaded-data="{ row }">
      {{ formatDate(row.date_uploaded, true) }}
    </template>
    <template #status-data="{ row }">
      <BaseStatusBadge :label="row.status_name" :type="setStatus(row.status)" variant="soft" />
    </template>
    <template #pemilihan-data="{ row }">
      <PilkadaHasilTpsPersentasePemilihan :uid="row.uid" />
    </template>
    <template #action-data="{ row }">
      <UButton
        :to="`/dashboard/pilkada/${row.uid}/hasil-tps/${row.uid}`"
        variant="ghost"
        color="slate"
        icon="i-heroicons-eye-solid"
      />
    </template>
  </BaseTablePagination>
</template>

<script setup>
const columns = [
  {
    label: "Nomor TPS",
    key: "no_tps",
  },
  {
    label: "Kabupaten / Kota",
    key: "city",
  },
  {
    label: "Kelurahan",
    key: "urban",
  },
  {
    label: "Date Uploaded",
    key: "date_uploaded",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Persentase Pemilihan & Lembar Saksi",
    key: "pemilihan",
  },
  {
    label: "Action",
    key: "action",
  },
];
const data = ref([
  {
    uid: "1",
    no_tps: "001",
    city: "Depok",
    urban: "Sangiang Jaya",
    date_uploaded: new Date(),
    status: 2,
    status_name: "Laporan Selesai",
    pemilihan: "https://google.com",
  },
]);

const setStatus = (val) =>
  ["warning", "success", "danger"].find((v, i) => i === val - 1);
</script>
