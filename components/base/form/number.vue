<template>
  <UInput v-model="model" />
</template>

<script setup>
const model = defineModel();
watch(model, (v) => (model.value = filterNumberOnly(v)));
</script>
