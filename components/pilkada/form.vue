<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="handleConfirmation">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data PILKADA
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton to="/dashboard/pilkada" color="white" label="Cancel" />
          <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
        </div>
      </div>

      <div class="w-full md:w-[80%] space-y-7">
        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">Nama PILKADA</BaseText>
          <UFormGroup class="basis-full md:basis-4/5 2xl:basis-5/6" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">Level PILKADA</BaseText>
          <UFormGroup class="basis-full md:basis-4/5 2xl:basis-5/6" name="level">
            <URadioGroup
              class="basis-5/6"
              :ui="{ fieldset: 'flex items-center flex-row gap-10' }"
              v-model="state.level"
              :options="levelOptions"
            />
          </UFormGroup>
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">Lokasi PILKADA</BaseText>
          <div class="basis-full md:basis-4/5 2xl:basis-5/6 space-y-4">
            <BaseFormProvince v-model="state.province" label="Provinsi" />
            <BaseFormCity
              v-if="state.level === 'walikota'"
              v-model="state.city"
              label="Kabupaten / Kota"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-3">
        <UButton to="/dashboard/pilkada" color="white" label="Cancel" />
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

const toast = useToast();
const { state, schema, levelOptions, handleSubmit } = useLocalForm();
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
    name: "",
    level: "",
    province: "",
    city: "",
  });

  const schema = object({
    name: string().required("Nama harus diisi"),
    level: string().required("Level harus diisi"),
    province: string().required("Provinsi harus diisi"),
    city: string().test(
      "is-level-city",
      "Kabupaten / kota harus diisi",
      (v) =>
        state.value.level !== "walikota" ||
        (state.value.level === "walikota" && v !== "")
    ),
  });

  const levelOptions = [
    {
      label: "Gubernur",
      value: "gubernur",
    },
    {
      label: "Bupati / Walikota",
      value: "walikota",
    },
  ];

  const handleSubmit = () => {
    toast.add({
      title: "Data berhasil ditambahkan",
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo("/dashboard/pilkada");
  };

  watch(
    () => state.value.level,
    (v) => (v === "walikota" ? (state.value.city = "") : null)
  );

  return { state, schema, levelOptions, handleSubmit };
}

function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
