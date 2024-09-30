<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari relawan..."
      placeholder="Pilih relawan"
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending' || disabled"
      option-attribute="name"
      value-attribute="uid"
    />
  </UFormGroup>
</template>

<script setup>
import { getRelawans } from '~/services/relawanService';

defineProps({
  name: {
    type: String,
    default: "number",
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

const { query, fetcher } = getRelawans();
query.value.size = 9999;
const { data: options, status } = await useAsyncData(fetcher, {
  transform: (v) => v.data,
});
</script>
