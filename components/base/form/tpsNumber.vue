<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari Nomor TPS..."
      placeholder="Pilih Nomor TPS"
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending' || !isParamsFilled || disabled"
      option-attribute="number"
      value-attribute="number"
    />
  </UFormGroup>
</template>

<script setup>
import { getTpses } from "~/services/tpsService";

const props = defineProps({
  filter: Object,
  name: {
    type: String,
    default: "tps_number",
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

const { query, fetcher } = getTpses();
query.value.size = 99999;
const {
  data: options,
  status,
  execute,
} = await useAsyncData(fetcher, {
  transform: (v) => v.data,
  immediate: false,
});

watchEffect(() => {
  const v = props.filter;
  if (v.village) {
    query.value.village_id = v.village;
  }
  else {
    options.value = null;
  }
});

const isParamsFilled = computed(() => query.value.village_id !== null);
watch(isParamsFilled, execute);
onMounted(() => {
  if (isParamsFilled.value) execute();
});
</script>
