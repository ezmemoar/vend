<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  el: {
    type: String,
    default: "p",
  },
});

const typeClass = computed(
  () =>
    ({
      title: "font-bold text-2xl",
      subtitle: "font-bold text-lg",
      text: "text-base",
    }[props.type])
);
</script>

<template>
  <component :is="el" :class="typeClass">
    <slot />
  </component>
</template>
