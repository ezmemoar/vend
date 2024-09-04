<template>
  <UModal v-model="modalShow">
    <div class="p-4 rounded flex flex-col items-center gap-4">
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="text-[180px] text-orange-500"
      />
      <div class="font-bold text-lg">
        <slot name="title">Apakah anda yakin?</slot>
      </div>
      <div>
        <slot name="description"> </slot>
      </div>
      <div class="mt-5 grid grid-cols-2 gap-3 w-full">
        <UButton
          :disabled="loading"
          severity="variant"
          block
          size="md"
          color="gray"
          class="mt-2 w-full"
          @click="modalShow = false"
        >
          <slot name="deny-text">Tidak</slot>
        </UButton>
        <UButton
          :disabled="loading"
          :loading="loading"
          block
          size="md"
          class="w-full mt-2"
          @click="$emit('confirm')"
        >
          <slot name="accept-text">Ya</slot>
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup>
defineProps({
  loading: Boolean,
})

const emit = defineEmits(['confirm'])

const modalShow = defineModel()
</script>
F