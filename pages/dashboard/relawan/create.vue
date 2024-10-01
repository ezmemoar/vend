<template>
  <RelawanForm />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: `Create Relawan`,
});
</script>