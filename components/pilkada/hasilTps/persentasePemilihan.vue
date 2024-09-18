<template>
  <UButton @click="isOpen = true" color="white" label="Lihat" />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="text-center w-full flex">
          <div class="size-6"></div>
          <BaseText type="subtitle" class="flex-1">
            Persentase Pemilihan & Lembar Saksi
          </BaseText>
          <div @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="size-6 cursor-pointer" />
          </div>
        </div>
      </template>

      <div class="flex flex-col gap-5">
        <UCard> test </UCard>
        <UCard> test </UCard>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
defineProps({
  uid: String,
});

const isOpen = ref(false);
</script>
