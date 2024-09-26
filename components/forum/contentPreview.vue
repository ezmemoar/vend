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
          <BaseText type="subtitle" class="font-bold">
            Isi berita dan Tanggapan
          </BaseText>
          <UButton variant="ghost" color="gray" @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="size-5"> </UIcon>
          </UButton>
        </div>
      </template>

      <div class="space-y-5">
        <UCard>
          <BaseText type="subtitle" class="font-bold">Isi berita</BaseText>
          <BaseText class="mt-2">
            {{ content }}
          </BaseText>
        </UCard>

        <UCard>
          <BaseText type="subtitle" class="font-bold">Cara Menanggapi</BaseText>
          <BaseText class="mt-2">
            {{ solve }}
          </BaseText>
        </UCard>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
defineProps({
  content: String,
  solve: String,
});

const isOpen = ref(false);
</script>
