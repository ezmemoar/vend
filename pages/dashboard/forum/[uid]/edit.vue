<template>
  <ForumForm :uid="route.params.uid" />
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

const route = useRoute();
useSeoMeta({
  title: `Edit Forum ${route.params.uid}`,
});
</script>
