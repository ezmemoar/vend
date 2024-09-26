<template>
  <div class="flex flex-col gap-7">
    <UForm :state :schema class="space-y-7" @submit="handleConfirmation">
      <div class="flex justify-between w-full">
        <BaseText el="h1" type="title">
          {{ isEdit ? "Edit" : "Tambah" }} Data TPS
        </BaseText>
        <div class="flex items-center gap-3">
          <UButton to="/dashboard/tps" color="white" label="Cancel" />
          <UButton type="submit" :label="isEdit ? 'Update' : 'Save'" />
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
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kabupaten / Kota
          </BaseText>
          <BaseFormCity
            disabled
            v-model="state.city"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kecamatan
          </BaseText>
          <BaseFormRegency
            disabled
            v-model="state.regency"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Kelurahan
          </BaseText>
          <BaseFormSubregency
            disabled
            v-model="state.subregency"
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
            v-model="state.subregency"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>

        <UDivider />

        <div class="flex max-sm:flex-col md:items-center">
          <BaseText class="basis-full md:basis-1/5 2xl:basis-1/6">
            Relawan
          </BaseText>
          <BaseFormRelawan
            v-model="state.relawan"
            class="basis-full md:basis-4/5 2xl:basis-5/6"
          />
        </div>
      </div>

      <UDivider />

      <div class="flex justify-end items-center gap-3">
        <UButton to="/dashboard/tps" color="white" label="Cancel" />
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
    province: null,
    city: null,
    regency: null,
    subregency: null,
    tps_number: null,
    relawan: null,
  });

  const schema = object({
    relawan: string().required("Relawan harus diisi"),
  });

  const handleSubmit = () => {
    toast.add({
      title: `Data berhasil ${isEdit ? "diedit" : "ditambahkan"}`,
      icon: "i-heroicons-check-circle",
      color: "success",
    });

    navigateTo(route.query.redirect ?? "/dashboard/tps");
  };

  return { state, schema, handleSubmit };
}

function useLocalModal() {
  const isOpen = ref(false);
  const handleConfirmation = () => (isOpen.value = true);
  return { isOpen, handleConfirmation };
}
</script>
