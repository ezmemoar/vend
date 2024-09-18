<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #link-data="{ row }">
      <UButton severity="text" label="Lihat" />
    </template>

    <template #content-data="{ row }">
      <UButton severity="text" label="Lihat" />
    </template>

    <template #sentiman-data="{ row }">
      <BaseStatusBadge
        variant="soft"
        :label="row.sentiman"
        :type="setStatusColor(row.sentiman)"
      />
    </template>

    <template #action-data="{ row }">
      <UButton
        :to="`/dashboard/forum/${row.uid}/edit`"
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
    title: "Perbaikan Puskesmas Dan Penambahan Alkes Meningkat 20%",
    media_type: "Online",
    link: "https://google.com",
    content: "test",
    sentiman: "positif",
  },
]);

const setStatusColor = (text) => {
  if (text === "positif") return "primary";
  else return "danger";
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Judul Berita", key: "title" });
  columns.value.push({ label: "Jenis Media", key: "media_type" });
  columns.value.push({ label: "Link / Sumber", key: "link" });
  columns.value.push({ label: "Isi Berita dan Tanggapan", key: "content" });
  columns.value.push({ label: "Sentiman Berita", key: "sentiman" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
