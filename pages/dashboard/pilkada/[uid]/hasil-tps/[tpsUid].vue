<template>
  <UForm :schema :state @submit="handleConfirmation">
    <div class="flex flex-col gap-7">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title"> Hasil Pemilihan TPS </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            :to="`/dashboard/pilkada/${route.params.uid}`"
            color="white"
            label="Cancel"
          />
          <UButton type="submit" label="Save" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
        <BaseListTile title="PILKADA" :subtitle="detailData.pilkada" />
        <BaseListTile title="Nomor TPS" :subtitle="detailData.tps_number" />
        <BaseListTile title="Kabupaten / Kota" :subtitle="detailData.city" />
        <BaseListTile title="Kelurahan" :subtitle="detailData.subregency" />
        <BaseListTile title="Relawan">
          <template #subtitle>
            <BaseText>
              {{ detailData.relawan_name }} ({{ detailData.relawan_phone }})
            </BaseText>
            <BaseText>{{ detailData.relawan_email }}</BaseText>
          </template>
        </BaseListTile>
        <BaseListTile
          title="Data Uploaded"
          :subtitle="formatDate(detailData.uploaded_at, true)"
        />
      </div>

      <hr />

      <div class="flex w-[80%]">
        <BaseText class="basis-1/6">Suara Pemilihan TPS</BaseText>
        <UFormGroup class="basis-5/6" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
      </div>

      <hr />

      <div class="flex w-[80%]">
        <BaseText class="basis-1/6">Lembar Saksi</BaseText>
        <UFormGroup class="basis-5/6" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
      </div>

      <hr />

      <div class="flex w-[80%]">
        <BaseText class="basis-1/6">Status</BaseText>
        <UFormGroup class="basis-5/6" name="status">
          <USelect v-model="state.status" :options="statusOptions" />
        </UFormGroup>
      </div>

      <hr />

      <div class="flex justify-end items-center gap-3">
        <UButton
          :to="`/dashboard/pilkada/${route.params.uid}`"
          color="white"
          label="Cancel"
        />
        <UButton type="submit" label="Save" />
      </div>
    </div>
  </UForm>

  <BaseModalConfirmation v-model="isOpen" @confirm="handleSubmit" />
</template>

<script setup>
import { object } from "yup";

const route = useRoute();
const toast = useToast();
const { state, schema, statusOptions, handleSubmit } = useLocalForm();
const { isOpen, handleConfirmation } = useLocalModal();

const detailData = {
  pilkada: "Pilkada Gubernur dan Wakil Gubernur Jawa Barat",
  tps_number: "001",
  city: "Depok",
  subregency: "Sangiang Jaya",
  relawan_name: "Putera Negara",
  relawan_phone: "087883534389",
  relawan_email: "puteranegara@gmail.com",
  uploaded_at: new Date(),
};

function useLocalForm() {
  const state = ref({
    tps: [
      {
        name: "Imam - Riri",
        value: null,
      },
      {
        name: "Supian Suri - Anis",
        value: null,
      },
    ],
    lembar_saksi: null,
    status: null,
  });

  const schema = object({
    tps: null,
    lembar_saksi: null,
    status: null,
  });

  const statusOptions = [
    {
      label: "Menunggu Verifikasi",
      value: "Menunggu Verifikasi",
    },
    {
      label: "Laporan Selesai",
      value: "Laporan Selesai",
    },
    {
      label: "Laporak Ditolak",
      value: "Laporak Ditolak",
    },
  ];

  const handleSubmit = () => {
    toast.add({
      title: "Laporan berhasil diverifikasi",
      icon: "i-heroicons-check-circle",
      color: "success",
    });
    navigateTo(`/dashboard/pilkada/${route.params.uid}`);
  };

  return { state, schema, statusOptions, handleSubmit };
}
function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
