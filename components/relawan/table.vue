<template>
  <BaseTablePagination
    :label
    :data="data?.data"
    :columns
    :loading="status === 'pending' || status === 'idle'"
  >
    <template #extra-button>
      <slot name="extra-button" />
    </template>

    <template #name-data="{ row }">
      <BaseText class="font-semibold">{{ row.name }}</BaseText>
      <BaseText class="text-gray-600">{{ row.email }}</BaseText>
    </template>
    <template #tps-data="{ row }">
      <BaseText>
        {{ row.tps?.number ? formatTrailingNumber(row.tps?.number) : "-" }}
      </BaseText>
    </template>
    <template #regency-data="{ row }">
      <BaseText>
        {{ row.regency?.name || '-' }}
      </BaseText>
    </template>
    <template #village-data="{ row }">
      <BaseText>
        {{ row.village?.name || '-' }}
      </BaseText>
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
import { getRelawans } from "~/services/relawanService";

const props = defineProps({
  label: String,
  redirectAfterEdit: String,
  // type: relawan, pilkada
  listType: {
    type: String,
    default: "relawan",
  },
  uid: {
    type: String,
    required: false,
  },
});

const { query, fetcher } = getRelawans();
if (props.uid) query.value.election_uid = props.uid;
const { data, status } = useAsyncData("relawan", fetcher);

const columns = ref([]);

const createLink = (uid) => {
  let text = `/dashboard/relawan/${uid}/edit`;
  if (props.redirectAfterEdit) text += `?redirect=${props.redirectAfterEdit}`;

  return text;
};

onMounted(() => {
  columns.value.push({ label: "No", key: "no" });
  columns.value.push({ label: "Nama Relawan", key: "name" });
  columns.value.push({ label: "No HP", key: "phone" });
  columns.value.push({ label: "Alamat Lengkap", key: "address" });

  if (props.listType === "pilkada") {
    columns.value.push({ label: "No TPS", key: "tps" });
    columns.value.push({ label: "Kabupaten / Kota", key: "regency" });
    columns.value.push({ label: "Keluarahan TPS", key: "village" });
  }

  if (props.listType === "relawan") {
    columns.value.push({ label: "Penugasan TPS", key: "penugasan" });
  }

  columns.value.push({ label: "Action", key: "action" });
});
</script>
