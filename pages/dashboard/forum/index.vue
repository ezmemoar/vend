<template>
  <div class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">Forum</BaseText>
      <div class="flex items-center gap-3">
        <UButton
          color="white"
          icon="i-heroicons-arrows-up-down-solid"
          label="Import to Excel"
        />
        <UButton
          to="/dashboard/forum/create"
          icon="i-heroicons-plus"
          label="Tambah Data"
        />
      </div>
    </div>

    <ForumTable label="List Data Forum" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: "List Forum",
});
</script>
