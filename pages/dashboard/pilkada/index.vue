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

    <BaseTablePagination label="List Update PILKADA" :data :columns>
      <template #data-data="{ row }">
        <BaseText>{{ row.data }}</BaseText>
        <BaseText>{{ row.percentage }}%</BaseText>
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
const toast = useToast();

const isOpen = ref(false);

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
    key: "level",
  },
  {
    label: "Provinsi",
    key: "province",
  },
  {
    label: "Kabupaten / Kota",
    key: "city",
  },
  {
    label: "Data Masuk",
    key: "data",
  },
  {
    label: "Action",
    key: "action",
  },
];

const data = [
  {
    uid: "1",
    name: "Pilkada Gubernur dan Wakil Gubernur Jawa Barat",
    level: "Gubernur",
    province: "Jawa Barat",
    city: "-",
    data: "175 / 1250 TPS",
    percentage: "30",
  },
];

const handleRedirect = () => {
  // isOpen.value = true;
  navigateTo("/dashboard/pilkada/create");
};
</script>
