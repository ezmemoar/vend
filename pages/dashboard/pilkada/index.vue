<template>
  <div class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">Data PILKADA</BaseText>
      <div class="flex items-center gap-3">
        <UButton
          color="white"
          icon="i-heroicons-arrows-up-down-solid"
          label="Import to Excel"
        />
        <UButton
          @click="handleRedirect"
          icon="i-heroicons-plus"
          label="Tambah Data"
        />
      </div>
    </div>

    <BaseTablePagination
      label="List Update PILKADA"
      :data="data?.data"
      :columns
      :loading="status === 'pending' || status === 'idle'"
      :total-page="data?.total_page"
      :count="data?.count"
    >
      <template #election_type-data="{ row }">
        {{ row.election_type.value }}
      </template>
      <template #province-data="{ row }">{{ row.province.name }}</template>
      <template #regency-data="{ row }">{{
        row.regency?.name || "-"
      }}</template>
      <template #tps_submitted-data="{ row }">
        <BaseText>{{ row.tps_submitted }} / {{ row.tps_total }} TPS</BaseText>
        <BaseText>{{ row.submitted_percentage }}%</BaseText>
      </template>
      <template #action-data="{ row }">
        <div class="flex items-center gap-2">
          <UButton
            :to="`/dashboard/pilkada/${row.uid}`"
            variant="ghost"
            color="slate"
            icon="i-heroicons-eye-solid"
          />
          <UButton
            :to="`/dashboard/pilkada/${row.uid}/edit`"
            variant="ghost"
            color="slate"
            icon="i-heroicons-pencil"
          />
        </div>
      </template>
    </BaseTablePagination>

    <BaseModalConfirmation v-model="isOpen">
      <template #title> Maaf Kuota Penambahan Data Habis </template>
      <template #description>
        Silahkan hubungi Admin di
        <UButton variant="link" to="https://wa.me/+6287883534317" class="p-0">
          +62878-8353-4317
        </UButton>
        untuk info lebih lanjut
      </template>

      <template #buttons>
        <UButton block @click="isOpen = false" label="Ok" />
      </template>
    </BaseModalConfirmation>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: "List Pilkada",
});

import { getPilkadas } from "~/services/pilkadaService";

const { filter } = useFilterStore();
const { fetcher } = getPilkadas();
const { data, status, execute } = useAsyncData("pilkada", fetcher);
watch(filter, execute);

const columns = [
  {
    label: "No",
    key: "no",
  },
  {
    label: "Nama PILKADA",
    key: "name",
  },
  {
    label: "Level PILKADA",
    key: "election_type",
  },
  {
    label: "Provinsi",
    key: "province",
  },
  {
    label: "Kabupaten / Kota",
    key: "regency",
  },
  {
    label: "Data Masuk",
    key: "tps_submitted",
  },
  {
    label: "Action",
    key: "action",
  },
];

const handleRedirect = () => {
  // isOpen.value = true;
  navigateTo("/dashboard/pilkada/create");
};

const isOpen = ref(false);
</script>
