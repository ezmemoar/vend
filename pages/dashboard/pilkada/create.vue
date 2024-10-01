<template>
  <PilkadaForm />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: "Create Pilkada",
});
</script>