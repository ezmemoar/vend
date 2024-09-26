<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #created_at-data="{ row }">
      {{ formatDate(row.created_at, true) }}
    </template>
    <template #image-data="{ row }">
      <UAvatar :src="row.image" size="lg" />
    </template>
    <template #quick_result-data="{ row }">
      {{ row.quick_result }}%
    </template>
    <template #real_result-data="{ row }">
      {{ row.real_result }}%
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
  // type: calon, pilkada
  listType: {
    type: String,
    default: "calon",
  },
});

const columns = ref([]);

const data = ref([
  {
    uid: "1",
    created_at: new Date(),
    pilkada: "Pilkada Gubernur dan Wakil Gubernur Jawa Barat",
    no_urut: "01",
    nama: "Imam - Riri",
    image: 'https://picsum.photos/200/200',
    quick_result: 57,
    real_result: 43,
  },
]);

const createLink = (uid) => {
  let text = `/dashboard/calon/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

onMounted(() => {
  columns.value.push({ label: "Date Created", key: "created_at" });

  if (props.listType === "calon") {
    columns.value.push({ label: "PILKADA", key: "pilkada" });
  }

  columns.value.push({ label: "Nomor Urut", key: "no_urut" });
  columns.value.push({ label: "Nama Calon", key: "nama" });
  columns.value.push({ label: "Foto", key: "image" });

  if (props.listType === "pilkada") {
    columns.value.push({ label: "Hasil Quick Count", key: "quick_result" });
    columns.value.push({ label: "Hasil Real Count", key: "real_result" });
  }

  columns.value.push({ label: "Action", key: "action" });
});
</script>
