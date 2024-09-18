<script setup>
defineProps({
  src: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="flex items-center gap-2">
    <UAvatar v-if="src" :src size="md" />
    <div class="flex-grow flex flex-col">
      <div v-if="title || $slots.title" class="font-bold">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div v-if="subtitle || $slots.subtitle">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </div>
    </div>
    <slot name="prefix" />
  </div>
</template>
