<template>
  <UModal v-model="isOpen">
    <div class="p-5 rounded space-y-2">
      <div class="text-center">
        <slot name="icon">
          <UIcon
            v-if="status === 'danger'"
            name="i-heroicons-x-circle"
            class="size-40 text-danger"
          />
          <UIcon
            v-else
            name="i-heroicons-check-circle"
            class="size-40 text-success"
          />
        </slot>
      </div>
      <div class="text-lg font-bold">
        {{ title }}
      </div>
      <div v-if="desc || $slots.description">
        <slot name="description">{{ desc }}</slot>
      </div>
      <slot name="action">
        <UButton block @click="isOpen = false" class="!mt-5"> Close </UButton>
      </slot>
    </div>
  </UModal>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    status: Status;
    title: string;
    desc?: string;
  }>(),
  {
    status: "success",
  }
);

const isOpen = defineModel({
  type: Boolean,
});
</script>
