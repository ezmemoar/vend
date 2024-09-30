<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="openMutateModal">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Relawan
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          />
          <UButton to="/dashboard/relawan" color="white" label="Cancel" />
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
            Nama Relawan
          </BaseText>
          <UFormGroup name="name" class="basis-full md:basis-4/5 2xl:basis-5/6">
            <UInput v-model="state.name" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Email
          </BaseText>
          <UFormGroup
            name="email"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UInput
              v-model="state.email"
              type="email"
              class="w-full"
              icon="mdi:email"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nomor HP
          </BaseText>
          <UFormGroup
            name="phone"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <BaseFormNumber
              v-model="state.phone"
              type="tel"
              class="w-full"
              icon="mdi:cellphone"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Alamat Lengkap
          </BaseText>
          <UFormGroup
            name="address"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UTextarea v-model="state.address" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kata Sandi
          </BaseText>
          <UFormGroup
            name="password"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <BaseFormPassword v-model="state.password" class="w-full" />
          </UFormGroup>
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Penugasan TPS
          </BaseText>
          <div class="space-y-7 w-full basis-full md:basis-4/5 2xl:basis-5/6">
            <BaseFormProvince v-model="state.province" label="Provinsi" />
            <BaseFormRegency
              v-model="state.regency"
              :filter="state"
              label="Kabupaten / Kota"
            />
            <BaseFormDistrict
              v-model="state.district"
              :filter="state"
              label="Kecamatan"
            />
            <BaseFormVillage
              v-model="state.village"
              :filter="state"
              label="Kelurahan"
            />
            <BaseFormTpsNumber
              v-model="state.tps"
              :filter="state"
              label="Nomor TPS"
            />
          </div>
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
        <UButton to="/dashboard/relawan" color="white" label="Cancel" />
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
  deleteRelawan,
  getRelawan,
  postRelawan,
  updateRelawan,
} from "~/services/relawanService";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const isEdit = computed(() => props.uid !== undefined);

const route = useRoute();
const toast = useToast();

const { params, fetcher } = getRelawan();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const {
  state,
  schema,
  fetcher: fetchMutateRelawan,
} = isEdit.value ? updateRelawan() : postRelawan();
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutateRelawan, {
  immediate: false,
});

const { params: deleteParams, fetcher: fetchDeleteRelawan } = deleteRelawan();
const {
  status: deleteStatus,
  execute: executeDelete,
  error: deleteError,
} = useAsyncData(fetchDeleteRelawan, {
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
      name: data.value.name,
      email: data.value.email,
      phone: data.value.phone,
      address: data.value.address,
      password: data.value.password,
      province: data.value.province?.id,
      regency: data.value.regency?.id,
      district: data.value.district?.id,
      village: data.value.village?.id,
      tps: data.value.tps?.id,
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

    navigateTo(route.query.redirect ?? "/dashboard/relawan");
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

    navigateTo(route.query.redirect ?? "/dashboard/relawan");
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
