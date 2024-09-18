<template>
  <UModal v-model="modalShow">
    <div class="p-4 rounded flex flex-col items-center gap-2">
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="text-[180px] text-orange-500"
      />
      <div class="text-center">
        <BaseText type="subtitle">
          <slot name="title">Apakah anda yakin?</slot>
        </BaseText>
        <BaseText>
          <slot name="description"
            >Apakah anda yakin untuk menambah data ini?</slot
          >
        </BaseText>
      </div>
      <div class="mt-5 w-full">
        <slot name="buttons">
          <div class="grid grid-cols-2 gap-3 w-full">
            <UButton
              :disabled="loading"
              severity="variant"
              block
              size="md"
              color="gray"
              class="mt-2 w-full"
              @click="modalShow = false"
            >
              <slot name="deny-text">Batalkan</slot>
            </UButton>
            <UButton
              :disabled="loading"
              :loading="loading"
              block
              size="md"
              class="w-full mt-2"
              @click="$emit('confirm')"
            >
              <slot name="accept-text">Ya, Save</slot>
            </UButton>
          </div>
        </slot>
      </div>
    </div>
  </UModal>
</template>

<script setup>
defineProps({
  loading: Boolean,
});

const emit = defineEmits(["confirm"]);

const modalShow = defineModel();
</script>
F
