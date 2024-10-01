<template>
  <div class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">Data TPS</BaseText>
      <div class="flex items-center gap-3">
        <UButton
          color="white"
          icon="i-heroicons-arrows-up-down-solid"
          label="Import to Excel"
        />
      </div>
    </div>

    <TpsTable label="List Data TPS" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

useSeoMeta({
  title: `List TPS`,
});
</script>