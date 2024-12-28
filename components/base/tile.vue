<template>
  <div
    class="flex sm:items-center max-sm:flex-col gap-3"
    :class="{ 'justify-between': expand }"
  >
    <div class="flex items-center gap-2 flex-1">
      <slot name="img">
        <UAvatar v-if="src" :src size="md" />
      </slot>
      <div class="flex-grow flex flex-col gap-1">
        <div v-if="title || $slots.title" class="font-bold" :class="ui?.title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <component
          v-if="subtitle || $slots.subtitle"
          :is="subtitle ? 'p' : 'div'"
          :class="ui?.subtitle"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </component>
      </div>
    </div>

    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Ui {
  title?: string;
  subtitle?: string;
}

withDefaults(
  defineProps<{
    src: string;
    title: string;
    subtitle: string;
    expand: boolean;
    ui?: Ui;
  }>(),
  { expand: false }
);
</script>
