<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari kabupaten / kota..."
      placeholder="Pilih kabupaten / kota"
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending' || !isParamsFilled || disabled"
      option-attribute="name"
      value-attribute="id"
    />
  </UFormGroup>
</template>

<script setup>
import { getRegencies } from "~/services/masterService";

const props = defineProps({
  filter: Object,
  name: {
    type: String,
    default: "regency",
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

const { params, fetcher } = getRegencies();
const {
  data: options,
  status,
  execute,
} = useAsyncData(fetcher, {
  transform: (v) => v.data,
  immediate: false,
});

watchEffect(() => {
  const v = props.filter;
  if (v.province) {
    params.value.provinceId = v.province;
  }
});

const isParamsFilled = computed(() =>
  Object.keys(params.value).every((v) => !!params.value[v])
);

watch(isParamsFilled, execute);
onMounted(() => {
  if (isParamsFilled.value) execute();
});
</script>
