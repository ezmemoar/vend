<template>
  <UFormGroup :label :name>
    <USelect
      v-model="model"
      :options="options || []"
      :loading="status === 'pending'"
      :disabled="status === 'pending' || disabled"
      option-attribute="name"
      value-attribute="url"
    />
  </UFormGroup>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: "no_urut",
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

const { data: options, status } = await useApi("pokemon", {
  transform: (val) => val.results,
});
</script>
