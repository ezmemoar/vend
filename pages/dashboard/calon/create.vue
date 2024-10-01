<template>
  <CalonForm />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: "Create Calon",
});
</script>
