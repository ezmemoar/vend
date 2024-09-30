<template>
  <UFormGroup :label :name>
    <USelectMenu
      searchable
      searchable-placeholder="Cari kelurahan..."
      placeholder="Pilih kelurahan"
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
import { getVillages } from "~/services/masterService";

const props = defineProps({
  filter: Object,
  name: {
    type: String,
    default: "village",
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

const { params, fetcher } = getVillages();
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
  if (v.regency) {
    params.value.regencyId = v.regency;
  }
  if (v.district) {
    params.value.districtId = v.district;
  }

  if (!v.province || !v.regency || !v.district) options.value = null;
});

const isParamsFilled = computed(() =>
  Object.keys(params.value).every((v) => !!params.value[v])
);
watch(isParamsFilled, execute);
onMounted(() => {
  if (isParamsFilled.value) execute();
});
</script>
