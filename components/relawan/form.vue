<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="handleConfirmation">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data Relawan
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton to="/dashboard/relawan" color="white" label="Cancel" />
          <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
        </div>
      </div>

      <div class="w-full md:w-[80%] space-y-7">
        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Nama Relawan
          </BaseText>
          <UFormGroup
            name="relawan"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          >
            <UInput v-model="state.relawan" class="w-full" />
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
            <UInput
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
            <BaseFormCity v-model="state.city" label="Kabupaten / Kota" />
            <BaseFormRegency v-model="state.regency" label="Kecamatan" />
            <BaseFormSubregency v-model="state.subregency" label="Kelurahan" />
            <BaseFormTpsNumber v-model="state.tps_number" label="Nomor TPS" />
          </div>
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <UButton to="/dashboard/relawan" color="white" label="Cancel" />
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
    relawan: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    province: null,
    city: null,
    regency: null,
    subregency: null,
    tps_number: null,
  });

  const schema = object({
    relawan: string().required("Nama relawan harus diisi"),
    email: string()
      .required("Email relawan harus diisi")
      .email("Email tidak valid"),
    phone: string().required("Nomor HP relawan harus diisi"),
    address: string().required("Alamat relawan harus diisi"),
    password: string().required("Kata sandi relawan harus diisi"),
  });

  const handleSubmit = () => {
    toast.add({
      title: `Data berhasil ${isEdit ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/relawan");
  };

  return { state, schema, handleSubmit };
}

function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
