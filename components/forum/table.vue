<template>
  <BaseTablePagination
    :label
    :data="data?.data"
    :columns
    :loading="status === 'pending'"
    :total-page="data?.total_page"
    :count="data?.count"
  >
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #url-data="{ row }">
      <UButton variant="link" label="Link" @click="openWindow(row.url)" />
    </template>

    <template #content-data="{ row }">
      <ForumContentPreview :uid="row.uid" />
    </template>

    <template #status-data="{ row }">
      <BaseStatusBadge
        variant="soft"
        :label="row.status"
        :type="setStatusColor(row.status)"
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
import { getForums } from "~/services/forumService";

const props = defineProps({
  label: String,
  redirectAfterEdit: String,
  uid: {
    type: String,
    required: false,
  },
});

const { filter } = useFilterStore();
const { query, fetcher } = getForums();
if (props.uid) query.value.election_uid = props.uid;
const { data, status, execute } = useAsyncData("forum", fetcher);
watch(filter, execute);

const columns = ref([]);

const createLink = (uid) => {
  let text = `/dashboard/forum/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

const setStatusColor = (text) => {
  if (text.toLowerCase() === "positif") return "primary";
  else if (text.toLowerCase() === "netral") return "warning";
  else return "danger";
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Judul Berita", key: "title" });
  columns.value.push({ label: "Jenis Media", key: "type" });
  columns.value.push({ label: "Link / Sumber", key: "url" });
  columns.value.push({ label: "Isi Berita dan Tanggapan", key: "content" });
  columns.value.push({ label: "Sentimen Berita", key: "status" });
  columns.value.push({ label: "Action", key: "action" });
});
</script>
