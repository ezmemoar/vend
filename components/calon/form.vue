<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="handleConfirmation">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Calon
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton to="/dashboard/calon" color="white" label="Cancel" />
          <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
        </div>
      </div>

      <div class="w-full md:w-[80%] space-y-7">
        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            PILKADA
          </BaseText>
          <BaseFormPilkada
            v-model="state.pilkada"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nama Calon
          </BaseText>
          <UFormGroup
            name="calon"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UInput v-model="state.calon" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nomor Urut
          </BaseText>
          <BaseFormNomorUrut
            v-model="state.no_urut"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Foto Calon
          </BaseText>
          <UFormGroup name="foto" class="basis-full md:basis-4/5 2xl:basis-5/6">
            <BaseFormUpload v-model="state.foto" class="w-full" />
          </UFormGroup>
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <UButton to="/dashboard/calon" color="white" label="Cancel" />
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
const { state, schema, handleSubmit } = useLocalForm();
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
    pilkada: null,
    calon: null,
    no_urut: null,
    foto: null,
  });

  const schema = object({
    pilkada: string().required("PILKADA harus diisi"),
    calon: string().required("Calon harus diisi"),
    no_urut: string().required("Nomor urut harus diisi"),
    // foto: string().required("Foto harus diisi"),
  });

  const handleSubmit = () => {
    toast.add({
      title: `Data berhasil ${isEdit ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/calon");
  };

  return { state, schema, handleSubmit };
}

function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
