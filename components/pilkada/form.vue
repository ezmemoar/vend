<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="openMutateModal">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data PILKADA
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          />
          <UButton to="/dashboard/pilkada" color="white" label="Cancel" />
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
            Nama PILKADA
          </BaseText>
          <UFormGroup class="basis-full md:basis-4/5 2xl:basis-5/6" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Type PILKADA
          </BaseText>
          <UFormGroup class="basis-full md:basis-4/5 2xl:basis-5/6" name="type">
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row gap-10' }"
              v-model="state.type"
              :options="typeOptions"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6"
            >Lokasi PILKADA</BaseText
          >
          <div class="basis-full md:basis-4/5 2xl:basis-5/6 space-y-4">
            <BaseFormProvince v-model="state.province" label="Provinsi" />
            <BaseFormRegency
              v-if="state.type === '2'"
              v-model="state.regency"
              :filter="state"
              label="Kabupaten / Kota"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-3">
        <UButton
          v-if="isEdit"
          @click="opendeleteModal"
          color="danger"
          label="Hapus Data"
          variant="soft"
        />
        <UButton to="/dashboard/pilkada" color="white" label="Cancel" />
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

    <BaseModalConfirmation
      v-model="isdeleteOpen"
      :loading="deleteStatus === 'pending'"
      @confirm="handleDelete"
    >
      <template #accept-text>Ya, Hapus</template>
      <template #description>
        Apakah anda yakin ingin menghapus data ini?
      </template>
    </BaseModalConfirmation>
  </div>
</template>

<script setup>
import {
  deletePilkada,
  getPilkada,
  postPilkada,
  updatePilkada,
} from "~/services/pilkadaService";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const isEdit = computed(() => props.uid !== undefined);

const route = useRoute();
const toast = useToast();

const { params, fetcher } = getPilkada();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const {
  state,
  schema,
  fetcher: fetchMutatePilkada,
} = isEdit.value ? updatePilkada() : postPilkada();
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutatePilkada, {
  immediate: false,
});

const { params: deleteParams, fetcher: fetchDeletePilkada } = deletePilkada();
const {
  status: deleteStatus,
  execute: executeDelete,
  error: deleteError,
} = useAsyncData(fetchDeletePilkada, {
  immediate: false,
});

const { typeOptions, handleSubmit, handleDelete } = useLocalForm();
const { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal } =
  useLocalModal();

onMounted(async () => {
  if (isEdit.value) {
    params.value.uid = props.uid;
    await execute();
    console.log(data.value.type);
    state.value = {
      uid: data.value.uid,
      name: data.value.name,
      type: `${data.value.election_type?.id}`,
      province: data.value.province?.id,
      regency: data.value.regency?.id,
    };
  }
});

function useLocalForm() {
  const typeOptions = [
    {
      label: "Gubernur",
      value: "1",
    },
    {
      label: "Bupati / Walikota",
      value: "2",
    },
  ];

  const handleSubmit = async () => {
    await executeMutate();
    if (mutateError.value) return;

    toast.add({
      title: `Data berhasil ${isEdit.value ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/pilkada");
  };

  const handleDelete = async () => {
    deleteParams.value.uid = props.uid;
    await executeDelete();
    if (deleteError.value) return;

    toast.add({
      title: `Data berhasil dihapus`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/pilkada");
  };

  watch(
    () => state.value.type,
    (v) => v !== "2" && (state.value.regency = null)
  );

  return { typeOptions, handleSubmit, handleDelete };
}

function useLocalModal() {
  const isMutateOpen = ref(false);
  const openMutateModal = () => (isMutateOpen.value = true);

  const isdeleteOpen = ref(false);
  const opendeleteModal = () => (isdeleteOpen.value = true);
  return { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal };
}
</script>
