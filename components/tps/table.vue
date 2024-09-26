<template>
  <BaseTablePagination :label :data :columns>
    <template #relawan-data="{ row }">
      <BaseText class="font-semibold">{{ row.relawan }}</BaseText>
      <BaseText class="text-gray-600">{{ row.email }}</BaseText>
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
const props = defineProps({
  label: String,
  redirectAfterEdit: String,
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
    relawan: "Sekartaji Anisa P",
    email: "sekar120@gmail.com",
  },
]);

const createLink = (uid) => {
  let text = `/dashboard/tps/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Provinsi", key: "province" });
  columns.value.push({ label: "Kabupaten / Kota", key: "city" });
  columns.value.push({ label: "Kecamatan", key: "regency" });
  columns.value.push({ label: "Kelurahan", key: "subregency" });
  columns.value.push({ label: "Nomor TPS", key: "tps_number" });
  columns.value.push({ label: "Nama Relawan", key: "relawan" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
