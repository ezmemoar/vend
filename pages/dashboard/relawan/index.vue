<template>
  <div class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">Data Relawan</BaseText>
      <div class="flex items-center gap-3">
        <UButton
          color="white"
          icon="i-heroicons-arrows-up-down-solid"
          label="Import to Excel"
        />
        <UButton icon="i-heroicons-plus" label="Tambah Data" />
      </div>
    </div>

    <RelawanTable label="List Data Relawan" />
  </div>
</template>
