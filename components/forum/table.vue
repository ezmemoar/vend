<template>
  <BaseTablePagination :label :data :columns>
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #source_link-data="{ row }">
      <UButton
        variant="link"
        label="Link"
        @click="openWindow(row.source_link)"
      />
    </template>

    <template #content-data="{ row }">
      <ForumContentPreview v-bind="row" />
    </template>

    <template #sentimen-data="{ row }">
      <BaseStatusBadge
        variant="soft"
        :label="row.sentimen"
        :type="setStatusColor(row.sentimen)"
      />
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
    title: "Perbaikan Puskesmas Dan Penambahan Alkes Meningkat 20%",
    date: new Date(),
    sentimen: "positif",
    source: "Online",
    source_img: "Online",
    source_link: "Online",
    content: `Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. `,
    solve: `Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. `,
  },
]);

const createLink = (uid) => {
  let text = `/dashboard/forum/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

const setStatusColor = (text) => {
  if (text === "positif") return "primary";
  else return "danger";
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Judul Berita", key: "title" });
  columns.value.push({ label: "Jenis Media", key: "source" });
  columns.value.push({ label: "Link / Sumber", key: "source_link" });
  columns.value.push({ label: "Isi Berita dan Tanggapan", key: "content" });
  columns.value.push({ label: "Sentimen Berita", key: "sentimen" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
