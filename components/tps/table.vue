<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #relawan_name-data="{ row }">
      <BaseText class="font-semibold">{{ row.relawan_name }}</BaseText>
      <BaseText class="text-gray-600">{{ row.relawan_email }}</BaseText>
    </template>
    <template #action-data="{ row }">
      <UButton
        :to="`/dashboard/tps/${row.uid}/edit`"
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
});

const columns = ref([]);

const data = ref([
  {
    uid: "1",
    province: "Jawa Barat",
    city: "Depok",
    regency: "Cicangheu",
    subregency: "Cilodong",
    tps_number: "001",
    relawan_name: "Sekartaji Anisa P",
    relawan_email: "sekar120@gmail.com",
  },
]);

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Provinsi", key: "province" });
  columns.value.push({ label: "Kabupaten / Kota", key: "city" });
  columns.value.push({ label: "Kecamatan", key: "regency" });
  columns.value.push({ label: "Kelurahan", key: "subregency" });
  columns.value.push({ label: "Nomor TPS", key: "tps_number" });
  columns.value.push({ label: "Nama Relawan", key: "relawan_name" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
