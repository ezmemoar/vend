<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="openMutateModal">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Calon
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          />
          <UButton to="/dashboard/calon" color="white" label="Cancel" />
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
            PILKADA
          </BaseText>
          <BaseFormPilkada
            v-model="state.election_uid"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nama Calon
          </BaseText>
          <UFormGroup name="name" class="basis-full md:basis-4/5 2xl:basis-5/6">
            <UInput v-model="state.name" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nomor Urut
          </BaseText>
          <UFormGroup
            name="number"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <BaseFormNumber v-model="state.number" class="w-full" />
          </UFormGroup>
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Foto Calon
          </BaseText>
          <UFormGroup
            name="picture"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <BaseFormUpload v-model="state.picture" path="calon" only-link :existed-filename="state.picture" class="w-full" />
          </UFormGroup>
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <UButton
          v-if="isEdit"
          @click="opendeleteModal"
          color="danger"
          label="Hapus Data"
          variant="soft"
        />
        <UButton to="/dashboard/calon" color="white" label="Cancel" />
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
  deleteCalon,
  getCalon,
  postCalon,
  updateCalon,
} from "~/services/calonService";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const isEdit = computed(() => props.uid !== undefined);

const route = useRoute();
const toast = useToast();

const { params, fetcher } = getCalon();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const {
  state,
  schema,
  fetcher: fetchMutateCalon,
} = isEdit.value ? updateCalon() : postCalon();
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutateCalon, {
  immediate: false,
});

const { params: deleteParams, fetcher: fetchDeleteCalon } = deleteCalon();
const {
  status: deleteStatus,
  execute: executeDelete,
  error: deleteError,
} = useAsyncData(fetchDeleteCalon, {
  immediate: false,
});

const { handleSubmit, handleDelete } = useLocalForm();
const { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal } =
  useLocalModal();

onMounted(async () => {
  if (isEdit.value) {
    params.value.uid = props.uid;
    await execute();
    state.value = {
      uid: data.value.uid,
      election_uid: data.value.election_uid,
      name: data.value.name,
      number: data.value.number,
      picture: data.value.picture,
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

    navigateTo(route.query.redirect ?? "/dashboard/calon");
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

    navigateTo(route.query.redirect ?? "/dashboard/calon");
  };

  return { handleSubmit, handleDelete };
}

function useLocalModal() {
  const isMutateOpen = ref(false);
  const openMutateModal = () => (isMutateOpen.value = true);

  const isdeleteOpen = ref(false);
  const opendeleteModal = () => (isdeleteOpen.value = true);
  return { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal };
}
</script>
