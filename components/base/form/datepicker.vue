<script setup lang="ts">
import type {
  DatePickerDate,
  DatePickerRangeObject,
} from "v-calendar/dist/types/src/use/datePicker.js";

const dayjs = useDayjs();

const props = defineProps({
  format: {
    type: String,
    default: "D MMM YYYY",
  },
  range: Boolean,
});

const model = defineModel<DatePickerDate | DatePickerRangeObject | null>();

const value = computed(() => {
  let val = null;
  if (model.value instanceof Date) {
    val = dayjs(model.value).format(props.format);
  } else if (model.value && model.value?.start && model.value?.end) {
    const start = dayjs(model.value.start).format(props.format);
    const end = dayjs(model.value.end).format(props.format);

    val = `${start} - ${end}`;
  } else {
    val = "";
  }

  return val;
});
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UInput
      placeholder="Select date"
      :value
      readonly
      icon="i-heroicons-calendar-days-20-solid"
    />

    <template #panel="{ close }">
      <BaseFormCalendar v-model="model" :range @close="close" />
    </template>
  </UPopover>
</template>
