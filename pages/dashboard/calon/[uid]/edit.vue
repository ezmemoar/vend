<template>
  <CalonForm :uid="route.params.uid" />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

const route = useRoute();
useSeoMeta({
  title: `Edit Calon ${route.params.uid}`,
});
</script>
