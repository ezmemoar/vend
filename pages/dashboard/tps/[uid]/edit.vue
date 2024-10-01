<template>
  <TpsForm :uid="route.params.uid" />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

const route = useRoute();
useSeoMeta({
  title: `Edit TPS ${route.params.uid}`,
});
</script>
