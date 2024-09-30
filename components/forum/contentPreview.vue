<template>
  <UButton variant="outline" color="white" label="Lihat" @click="open" />

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
          <div class="mt-2">
            <div v-if="status === 'pending'" class="space-y-3">
              <USkeleton class="w-full h-4" />
              <USkeleton class="w-full h-4" />
            </div>
            <BaseText v-else>
              {{ data.content }}
            </BaseText>
          </div>
        </UCard>

        <UCard>
          <BaseText type="subtitle" class="font-bold">Cara Menanggapi</BaseText>
          <div class="mt-2">
            <div v-if="status === 'pending'" class="space-y-3">
              <USkeleton class="w-full h-4" />
              <USkeleton class="w-full h-4" />
            </div>
            <BaseText v-else>
              {{ data.response }}
            </BaseText>
          </div>
        </UCard>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { getForum } from "~/services/forumService";

const props = defineProps({
  uid: String,
});

const { params, fetcher } = getForum();
params.value.uid = props.uid;
const { data, status, execute } = useAsyncData(`forum-${props.uid}`, fetcher, {
  transform: (v) => v.data,
  immediate: false,
});

const isOpen = ref(false);

const open = () => {
  execute();
  isOpen.value = true;
};
</script>
