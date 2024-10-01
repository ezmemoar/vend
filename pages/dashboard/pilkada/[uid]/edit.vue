<template>
  <PilkadaForm :uid="route.params.uid" />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

const route = useRoute();
useSeoMeta({
  title: `Edit Pilkada ${route.params.uid}`,
});
</script>
