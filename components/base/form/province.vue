<template>
  <UFormGroup :label :name>
    <USelect
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending'"
      option-attribute="name"
      value-attribute="url"
    />
  </UFormGroup>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: "province",
  },
  label: {
    type: String,
    default: "Provinsi",
  },
});

const model = defineModel();

const { data: options, status } = await useApi("pokemon", {
  transform: (val) => val.results,
});
</script>
