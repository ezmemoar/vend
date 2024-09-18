<template>
  <UBadge :label :color :variant />
</template>

<script setup>
import { BADGE_COLOR_STATUS } from "~/constants/status";

const props = defineProps({
  label: String,
  variant: String,
  type: {
    type: String,
    default: "primary",
  },
});

const color = computed(() => BADGE_COLOR_STATUS[props.type]);
</script>
