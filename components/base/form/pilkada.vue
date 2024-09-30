<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari Nomor TPS..."
      placeholder="Pilih Nomor TPS"
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
import { getPilkadas } from '~/services/pilkadaService';

defineProps({
  name: {
    type: String,
    default: "election_uid",
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

const { query, fetcher } = getPilkadas();
query.value.size = 99999;
const {
  data: options,
  status,
} = await useAsyncData(fetcher, {
  transform: (v) => v.data,
});
</script>
