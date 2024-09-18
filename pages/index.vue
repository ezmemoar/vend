<script setup>
const columns = [
  {
    key: "name",
    label: "name",
  },
  {
    key: "class",
    label: "class",
  },
];
const data = [
  {
    name: "Rizal",
    class: "10X",
  },
  {
    name: "Rizky",
    class: "11F",
  },
];
</script>

<template>
  <div class="flex justify-between w-full">
    <h1 class="font-bold text-2xl">Data PILKADA</h1>
    <div class="flex items-center gap-3">
      <UButton
        color="white"
        icon="i-heroicons-arrows-up-down-solid"
        label="Import to Excel"
      />
      <UButton icon="i-heroicons-plus" label="Tambah Data" />
    </div>
  </div>
</template>
