<template>
  <UButton
    variant="outline"
    color="white"
    label="Lihat"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex w-full justify-between items-center">
          <UButton class="invisible"
            ><UIcon name="i-heroicons-x-mark" class="size-5"></UIcon
          ></UButton>
          <BaseText type="subtitle" class="font-bold"> Penugasan TPS </BaseText>
          <UButton variant="ghost" color="gray" @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="size-5"> </UIcon>
          </UButton>
        </div>
      </template>

      <UCard>
        <template #header>
          <BaseListTile
            :title="relawan"
            :subtitle="`${email} (${cellphone})`"
          />
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <BaseListTile title="Provinsi" :subtitle="province" />
          <BaseListTile title="Kabupaten / Kota" :subtitle="city" />
          <BaseListTile title="Kecamatan" :subtitle="regency" />
          <BaseListTile title="Kelurahan" :subtitle="subregency" />
          <BaseListTile title="Nomor TPS" :subtitle="tps_number" />
        </div>

        <template #footer>
          <div class="w-full flex items-center justify-end gap-3">
            <UButton
              variant="outline"
              color="white"
              label="Cancel"
              @click="isOpen = false"
            />
            <UButton :to="`/dashboard/relawan/${uid}/edit`" label="Edit" />
          </div>
        </template>
      </UCard>
    </UCard>
  </UModal>
</template>

<script setup>
defineProps({
  uid: String,
  relawan: String,
  email: String,
  cellphone: String,
  province: String,
  city: String,
  regency: String,
  subregency: String,
  tps_number: String,
});

const isOpen = ref(false);
</script>
