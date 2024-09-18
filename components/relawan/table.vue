<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #relawan_name-data="{ row }">
      <BaseText class="font-semibold">{{ row.relawan_name }}</BaseText>
      <BaseText class="text-gray-600">{{ row.relawan_email }}</BaseText>
    </template>
    <template #penugasan-data="{ row }">
      <UButton color="white" label="Lihat" />
    </template>
    <template #action-data="{ row }">
      <UButton
        :to="`/dashboard/relawan/${row.uid}/edit`"
        variant="ghost"
        color="slate"
        icon="i-heroicons-pencil"
      />
    </template>
  </BaseTablePagination>
</template>

<script setup>
const props = defineProps({
  label: String,
  // type: relawan, pilkada
  listType: {
    type: String,
    default: "relawan",
  },
});

const columns = ref([]);

const data = ref([
  {
    uid: "1",
    relawan_name: "Rudi Tabuti",
    relawan_email: "rudi@gmail.com",
    cellphone: "+62829802939283",
    address: "Depok, Pondok",
    tps_number: "001",
    city: "Depok",
    subregency: "Cilodong",
    penugasan: 'Belum Ditugaskan',
  },
]);

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Nama Relawan", key: "relawan_name" });
  columns.value.push({ label: "No HP", key: "cellphone" });
  columns.value.push({ label: "Alamat Lengkap", key: "address" });

  if (props.listType === "pilkada") {
    columns.value.push({ label: "No TPS", key: "tps_number" });
    columns.value.push({ label: "Kabupaten / Kota", key: "city" });
    columns.value.push({ label: "Keluarahan TPS", key: "subregency" });
  }

  if (props.listType === "relawan") {
    columns.value.push({ label: "Penugasan TPS", key: "penugasan" });
  }

  columns.value.push({ label: "Action", key: "action" });
});
</script>
