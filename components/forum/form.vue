<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="openMutateModal">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Forum
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton
            v-if="isEdit"
            @click="opendeleteModal"
            color="danger"
            label="Hapus Data"
            variant="soft"
          />
          <UButton to="/dashboard/forum" color="white" label="Cancel" />
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
            Judul Berita
          </BaseText>
          <UFormGroup
            name="title"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UInput v-model="state.title" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Tanggal Berita
          </BaseText>
          <UFormGroup name="date" class="basis-full md:basis-4/5 2xl:basis-5/6">
            <BaseFormDatepicker v-model="state.date" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Sentimen Berita
          </BaseText>
          <UFormGroup
            class="basis-full md:basis-4/5 2xl:basis-5/6"
            name="status"
          >
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row flex-wrap gap-5' }"
              v-model="state.status"
              :options="statusOptions"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Sumber Media
          </BaseText>
          <UFormGroup class="basis-full md:basis-4/5 2xl:basis-5/6" name="type">
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row gap-5' }"
              v-model="state.type"
              :options="typeOptions"
            />
          </UFormGroup>
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Link Sumber
          </BaseText>
          <div class="basis-full md:basis-4/5 2xl:basis-5/6 space-y-7">
            <UFormGroup label="Gambar" name="image">
              <BaseFormUpload
                v-model="state.image"
                path="forum"
                only-link
                :existed-filename="state.image"
                class="w-full"
              />
            </UFormGroup>
            <UFormGroup label="Link" name="url">
              <UInput
                v-model="state.url"
                class="w-full"
                icon="material-symbols:link"
              />
            </UFormGroup>
          </div>
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Isi Berita
          </BaseText>
          <UFormGroup
            name="content"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UTextarea v-model="state.content" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Cara Menanggapi
          </BaseText>
          <UFormGroup
            name="response"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UTextarea v-model="state.response" class="w-full" />
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
        <UButton to="/dashboard/forum" color="white" label="Cancel" />
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
  deleteForum,
  getForum,
  postForum,
  updateForum,
} from "~/services/forumService";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const isEdit = computed(() => props.uid !== undefined);

const route = useRoute();
const toast = useToast();

const { params, fetcher } = getForum();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const {
  state,
  schema,
  fetcher: fetchMutateForum,
} = isEdit.value ? updateForum() : postForum();
const {
  status: mutateStatus,
  execute: executeMutate,
  error: mutateError,
} = useAsyncData(fetchMutateForum, {
  immediate: false,
});

const { params: deleteParams, fetcher: fetchDeleteForum } = deleteForum();
const {
  status: deleteStatus,
  execute: executeDelete,
  error: deleteError,
} = useAsyncData(fetchDeleteForum, {
  immediate: false,
});

const { statusOptions, typeOptions, handleSubmit, handleDelete } =
  useLocalForm();
const { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal } =
  useLocalModal();

onMounted(async () => {
  if (isEdit.value) {
    params.value.uid = props.uid;
    await execute();
    state.value = {
      uid: data.value.uid,
      title: data.value.title,
      date: new Date(data.value.date),
      type: data.value.type,
      url: data.value.url,
      image: data.value.image,
      status: data.value.status,
      content: data.value.content,
      response: data.value.response,
    };
  }
});

function useLocalForm() {
  const statusOptions = [
    {
      label: "Positif",
      value: "Positif",
    },
    {
      label: "Negatif",
      value: "Negatif",
    },
    {
      label: "Netral",
      value: "Netral",
    },
  ];

  const typeOptions = [
    {
      label: "Offline",
      value: "Offline",
    },
    {
      label: "Online",
      value: "Online",
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

    navigateTo(route.query.redirect ?? "/dashboard/forum");
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

    navigateTo(route.query.redirect ?? "/dashboard/forum");
  };

  return { statusOptions, typeOptions, handleSubmit, handleDelete };
}

function useLocalModal() {
  const isMutateOpen = ref(false);
  const openMutateModal = () => (isMutateOpen.value = true);

  const isdeleteOpen = ref(false);
  const opendeleteModal = () => (isdeleteOpen.value = true);
  return { isMutateOpen, openMutateModal, isdeleteOpen, opendeleteModal };
}
</script>
