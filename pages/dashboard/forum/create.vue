<template>
  <ForumForm />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});
useSeoMeta({
  title: "Create Forum",
});
</script>
