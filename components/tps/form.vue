<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="openMutateModal">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data TPS
        </BaseText>
        <div class="flex items-center gap-3">
          <!-- <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          /> -->
          <UButton to="/dashboard/tps" color="white" label="Cancel" />
          <UButton
            type="submit"
            :label="isEdit ? 'Update' : 'Save'"
            :disabled="status === 'pending'"
            :loading="status === 'pending'"
          />
        </div>
      </div>

      <div class="w-full md:w-[80%] space-y-7">
        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            provinsi
          </BaseText>
          <BaseFormProvince
            disabled
            v-model="state.province"
            :filter="state"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kabupaten / Kota
          </BaseText>
          <BaseFormRegency
            disabled
            v-model="state.regency"
            :filter="state"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kecamatan
          </BaseText>
          <BaseFormDistrict
            disabled
            v-model="state.district"
            :filter="state"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kelurahan
          </BaseText>
          <BaseFormVillage
            disabled
            v-model="state.village"
            :filter="state"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nomor TPS
          </BaseText>
          <BaseFormTpsNumber
            disabled
            v-model="state.number"
            :filter="state"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Relawan
          </BaseText>
          <BaseFormRelawan
            v-model="state.name"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <!-- <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          /> -->
        <UButton to="/dashboard/tps" color="white" label="Cancel" />
        <UButton
          type="submit"
          :label="isEdit ? 'Update' : 'Save'"
          :disabled="status === 'pending'"
          :loading="status === 'pending'"
        />
      </div>
    </UForm>

    <BaseModalConfirmation
      v-model="isMutateOpen"
      :loading="mutateStatus === 'pending'"
      @confirm="handleSubmit"
    >
      <template #description>
        Apakah anda yakin untuk {{ isEdit ? "update" : "menambah" }} data ini?
      </template>
    </BaseModalConfirmation>

    <!-- <BaseModalConfirmation
  v-model="isdeleteOpen"
  :loading="deleteStatus === 'pending'"
  @confirm="handleDelete"
>
  <template #accept-text>Ya, Hapus</template>
  <template #description>
    Apakah anda yakin ingin menghapus data ini?
  </template>
</BaseModalConfirmation> -->
  </div>
</template>

<script setup>
import {
  // deleteTps,
  getTps,
  // postTps,
  updateTps,
} from "~/services/tpsService";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const isEdit = computed(() => props.uid !== undefined);

const route = useRoute();
const toast = useToast();

const { params, fetcher } = getTps();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

// const {
//   state,
//   schema,
//   fetcher: fetchMutateTps,
// } = isEdit.value ? updateTps() : postTps();
const { state, schema, fetcher: fetchMutateTps } = updateTps();
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutateTps, {
  immediate: false,
});

// const { params: deleteParams, fetcher: fetchDeleteTps } = deleteTps();
// const {
//   status: deleteStatus,
//   execute: executeDelete,
//   error: deleteError,
// } = useAsyncData(fetchDeleteTps, {
//   immediate: false,
// });

const {
  handleSubmit,
  // handleDelete
} = useLocalForm();
const {
  isMutateOpen,
  openMutateModal,
  // isdeleteOpen,
  // opendeleteModal
} = useLocalModal();

onMounted(async () => {
  if (isEdit.value) {
    params.value.uid = props.uid;
    await execute();
    state.value = {
      uid: data.value.uid,
      province: data.value.province?.id,
      regency: data.value.regency?.id,
      district: data.value.district?.id,
      village: data.value.village?.id,
      number: data.value.number,
      name: data.value.relawan?.name,
    };
  }
});

function useLocalForm() {
  const handleSubmit = async () => {
    await executeMutate();
    if (mutateError.value) return;

    toast.add({
      title: `Data berhasil ${isEdit.value ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/tps");
  };

  // const handleDelete = async () => {
  //   deleteParams.value.uid = props.uid;
  //   await executeDelete();
  //   if (deleteError.value) return;

  //   toast.add({
  //     title: `Data berhasil dihapus`,
  //     icon: "i-heroicons-check-circle",
  //     color: "success",
  //   });

  //   navigateTo(route.query.redirect ?? "/dashboard/tps");
  // };

  return {
    handleSubmit,
    // handleDelete
  };
}

function useLocalModal() {
  const isMutateOpen = ref(false);
  const openMutateModal = () => (isMutateOpen.value = true);

  // const isdeleteOpen = ref(false);
  // const opendeleteModal = () => (isdeleteOpen.value = true);
  return {
    isMutateOpen,
    openMutateModal,
    // isdeleteOpen, opendeleteModal
  };
}
</script>
