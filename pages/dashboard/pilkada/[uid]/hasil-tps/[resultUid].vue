<template>
  <div
    v-if="status === 'pending' || status === 'idle'"
    class="w-full flex justify-center"
  >
    <UIcon
      name="i-tdesign-loading"
      class="size-14 animate-spin text-gray-500"
    />
  </div>
  <UForm v-else :schema :state @submit="openModal">
    <div class="flex flex-col gap-7">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title"> Hasil Pemilihan TPS </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            :to="`/dashboard/pilkada/${route.params.uid}`"
            color="white"
            label="Cancel"
            :disabled="mutateStatus === 'pending'"
            :loading="mutateStatus === 'pending'"
          />
          <UButton
            type="submit"
            label="Save"
            :disabled="
              mutateStatus === 'pending' ||
              data?.status.id === HASIL_TPS_STATUS.ACCEPTED
            "
            :loading="mutateStatus === 'pending'"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-10">
        <BaseListTile title="PILKADA" :subtitle="data?.election" />
        <BaseListTile title="Nomor TPS" :subtitle="data?.tps?.number" />
        <BaseListTile
          title="Kabupaten / Kota"
          :subtitle="data?.regency?.name"
        />
        <BaseListTile title="Kelurahan" :subtitle="data?.village?.name" />
        <BaseListTile title="Relawan">
          <template #subtitle>
            <BaseText> {{ data?.relawan?.name }} </BaseText>
            <BaseText>{{ data?.relawan?.email }}</BaseText>
          </template>
        </BaseListTile>
        <BaseListTile
          title="Data Uploaded"
          :subtitle="formatDate(data?.created_at, true)"
        />
      </div>

      <hr />

      <div class="flex w-[80%] items-center">
        <BaseText class="basis-1/6">Suara Pemilihan TPS</BaseText>
        <div class="basis-5/6 space-y-5">
          <UFormGroup
            v-for="(val, i) in state.result"
            :key="val.candidate_id"
            :name="`result[${i}].total_votes`"
            :label="`${i + 1}. ${val.name}`"
          >
            <BaseFormNumber
              v-model="state.result[i].total_votes"
              :disabled="mutateStatus === 'pending'"
              :loading="mutateStatus === 'pending'"
            />
          </UFormGroup>
        </div>
      </div>

      <hr />

      <div class="flex w-[80%] items-center">
        <BaseText class="basis-1/6">Lembar Saksi</BaseText>
        <UFormGroup class="basis-5/6" name="lembar_saksi">
          <BaseFormUpload
            v-model="state.lembar_saksi"
            path="pilkada-result"
            :existed-filename="state.lembar_saksi"
            only-link
            :disabled="mutateStatus === 'pending'"
            :loading="mutateStatus === 'pending'"
          />
        </UFormGroup>
      </div>

      <hr />

      <div class="flex w-[80%] items-center">
        <BaseText class="basis-1/6">Status</BaseText>
        <UFormGroup class="basis-5/6" name="status">
          <USelect
            v-model="state.status"
            :options="statusOptions"
            :disabled="mutateStatus === 'pending'"
            :loading="mutateStatus === 'pending'"
          />
        </UFormGroup>
      </div>

      <hr />

      <div class="flex justify-end items-center gap-3">
        <UButton
          :to="`/dashboard/pilkada/${route.params.uid}`"
          :disabled="mutateStatus === 'pending'"
          :loading="mutateStatus === 'pending'"
          color="white"
          label="Cancel"
        />
        <UButton
          type="submit"
          :disabled="
            mutateStatus === 'pending' ||
            data?.status.id === HASIL_TPS_STATUS.ACCEPTED
          "
          :loading="mutateStatus === 'pending'"
          label="Save"
        />
      </div>
    </div>
  </UForm>

  <BaseModalConfirmation
    v-model="isOpen"
    :loading="mutateStatus === 'pending'"
    @confirm="handleSubmit"
  />
</template>

<script setup>
import { HASIL_TPS_STATUS } from "~/constants/status";
import {
  getPilkadaResult,
  updatePilkadaResult,
} from "~/services/pilkadaService";

definePageMeta({
  middleware: "is-authenticated",
});

const route = useRoute();
useSeoMeta({
  title: `Edit Pilkada Result ${route.params.resultUid}`,
});

const toast = useToast();

const {
  state,
  schema,
  params: mutateParams,
  fetcher: fetchMutatePilkada,
} = updatePilkadaResult();
mutateParams.value.uid = route.params.uid;
mutateParams.value.resultUid = route.params.resultUid;
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutatePilkada, {
  immediate: false,
});

const { params, fetcher } = getPilkadaResult();
params.value.uid = route.params.uid;
params.value.resultUid = route.params.resultUid;
const { data, status } = useAsyncData(fetcher, {
  transform: (v) => {
    state.value.result.push(
      ...v.data.candidates.map((val) => ({
        candidate_id: val.uid,
        name: val.name,
        total_votes: val.number,
      }))
    );

    state.value.status = v.data.status.id;
    return v.data;
  },
});

const { statusOptions, handleSubmit } = useLocalForm();
const { isOpen, openModal } = useLocalModal();

function useLocalForm() {
  const statusOptions = [
    {
      label: "Menunggu Verifikasi",
      value: HASIL_TPS_STATUS.WAITING,
    },
    {
      label: "Laporan Selesai",
      value: HASIL_TPS_STATUS.ACCEPTED,
    },
    {
      label: "Laporak Ditolak",
      value: HASIL_TPS_STATUS.REJECTED,
    },
  ];

  const handleSubmit = async () => {
    await executeMutate();
    if (mutateError.value) return;

    toast.add({
      title: "Laporan berhasil diverifikasi",
      icon: "i-heroicons-check-circle",
      color: "success",
    });
    navigateTo(`/dashboard/pilkada/${route.params.uid}`);
  };

  return { statusOptions, handleSubmit };
}
function useLocalModal() {
  const isOpen = ref(false);
  const openModal = () => (isOpen.value = true);
  return { isOpen, openModal };
}
</script>
