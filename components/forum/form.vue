<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="handleConfirmation">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Forum
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton to="/dashboard/forum" color="white" label="Cancel" />
          <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
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
            name="sentimen"
          >
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row gap-10' }"
              v-model="state.sentimen"
              :options="sentimenOptions"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Sumber Media
          </BaseText>
          <UFormGroup
            class="basis-full md:basis-4/5 2xl:basis-5/6"
            name="source"
          >
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row gap-10' }"
              v-model="state.source"
              :options="sourceOptions"
            />
          </UFormGroup>
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Link Sumber
          </BaseText>
          <div class="basis-full md:basis-4/5 2xl:basis-5/6 space-y-7">
            <UFormGroup label="Gambar" name="source_img">
              <BaseFormUpload v-model="state.source_img" class="w-full" />
            </UFormGroup>
            <UFormGroup label="Link" name="source_link">
              <UInput
                v-model="state.source_link"
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
            name="solve"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UTextarea v-model="state.solve" class="w-full" />
          </UFormGroup>
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <UButton to="/dashboard/forum" color="white" label="Cancel" />
        <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
      </div>
    </UForm>

    <BaseModalConfirmation v-model="isOpen" @confirm="handleSubmit" />
  </div>
</template>

<script setup>
import { object, string } from "yup";

const props = defineProps({
  uid: {
    type: String,
    required: false,
  },
});

const route = useRoute();
const toast = useToast();
const { state, schema, sentimenOptions, sourceOptions, handleSubmit } =
  useLocalForm();
const { isOpen, handleConfirmation } = useLocalModal();

const isEdit = computed(() => props.uid !== undefined);

onMounted(() => {
  if (props.uid) {
    // todo update data from database
    // state.value = res;
  }
});

function useLocalForm() {
  const state = ref({
    title: null,
    date: null,
    sentimen: null,
    source: null,
    source_img: null,
    source_link: null,
    content: null,
    solve: null,
  });

  const schema = object({
    title: string().required("Judul berita harus diisi"),
    date: string().required("Tanggal berita harus diisi"),
    sentimen: string().required("Sentimen berita harus diisi"),
    source: string().required("Sumber media harus diisi"),
    // source_img: string().required("Gambar sumber harus diisi"),
    source_link: string().required("Link sumber harus diisi"),
    content: string().required("Isi berita harus diisi"),
    solve: string().required("Cara menanggapi harus diisi"),
  });

  const sentimenOptions = [
    {
      label: "Positif",
      value: "positif",
    },
    {
      label: "Negatif",
      value: "negatif",
    },
  ];

  const sourceOptions = [
    {
      label: "Offline",
      value: "offline",
    },
    {
      label: "Online",
      value: "online",
    },
  ];

  const handleSubmit = () => {
    toast.add({
      title: `Data berhasil ${isEdit ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/forum");
  };

  return { state, schema, sentimenOptions, sourceOptions, handleSubmit };
}

function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
