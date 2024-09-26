<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #relawan-data="{ row }">
      <BaseText class="font-semibold">{{ row.relawan }}</BaseText>
      <BaseText class="text-gray-600">{{ row.email }}</BaseText>
    </template>
    <template #address-data="{ row }">
      <div class="w-80 truncate">{{ row.address }}</div>
    </template>
    <template #penugasan-data="{ row }">
      <RelawanPenugasanPreview v-bind="row" />
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
    relawan: "Rudi Tabuti",
    email: "rudi@gmail.com",
    cellphone: "+62829802939283",
    address:
      "Depok, Pondok Tirta Jaya Blok Biasa Depok, Pondok Tirta Jaya Blok Biasa Depok, Pondok Tirta Jaya Blok Biasa Depok, Pondok Tirta Jaya Blok Biasa",
    tps_number: "001",
    province: "Jawa Barat",
    city: "Depok",
    regency: "Cilodong",
    subregency: "Sukmajaya",
    penugasan: "Belum Ditugaskan",
  },
]);

const createLink = (uid) => {
  let text = `/dashboard/relawan/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Nama Relawan", key: "relawan" });
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
