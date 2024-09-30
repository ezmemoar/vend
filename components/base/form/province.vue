<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari provinsi..."
      placeholder="Pilih provinsi"
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending' || disabled"
      option-attribute="name"
      value-attribute="id"
    />
  </UFormGroup>
</template>

<script setup>
import { getProvinces } from "~/services/masterService";

defineProps({
  name: {
    type: String,
    default: "province",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel();

const { fetcher } = getProvinces();
const { data: options, status } = useAsyncData(fetcher, {
  transform: (v) => v.data,
});
</script>
