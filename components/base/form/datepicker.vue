<script setup lang="ts">
import type { FormDateRangeOptions } from "~/interfaces/general/form";

withDefaults(defineProps<{ range: boolean }>(), {
  range: false,
});

const model = defineModel<DateRangePicker | FormDatePicker>({
  default: {
    start: null,
    end: null,
  },
});

const dayjs = useDayjs();

const year = new Date().getFullYear();
const ranges: FormDateRangeOptions[] = [
  { label: "First to Latest", start: new Date(year, 0, 1), end: new Date() },
  { label: "Last weeks", start: { duration: 1, unit: "weeks" } },
  { label: "Last months", start: { duration: 1, unit: "months" } },
  { label: "Last year", start: { duration: 1, unit: "year" } },
  { label: "Q1", start: new Date(year, 0), end: new Date(year, 2, 31) },
  { label: "Q2", start: new Date(year, 3), end: new Date(year, 5, 30) },
  { label: "Q3", start: new Date(year, 6), end: new Date(year, 8, 30) },
  { label: "Q4", start: new Date(year, 9), end: new Date(year, 11, 31) },
];

const createDate = (d: FormDateRangeType | undefined) => {
  if (!d) new Date();
  else if (d instanceof Date) return d;

  return dayjs(new Date())
    .subtract(d?.duration ?? 0, d?.unit ?? undefined)
    .toDate();
};

const selectRange = (r: FormDateRangeOptions) => {
  model.value = {
    start: createDate(r.start),
    end: createDate(r.end),
  };
};

const displayText = computed(() => {
  if (!model.value) return null;
  else if (model.value instanceof Date) {
    return dayjs(model.value).format("DD MMM YYYY");
  }

  const newD = model.value as DateRangePicker;
  return !newD.start
    ? null
    : `${dayjs(newD.start).format("DD MMM YYYY")} - ${dayjs(newD.end).format(
        "DD MMM YYYY"
      )}`;
});
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UInput
      readonly
      icon="i-heroicons-calendar-days-20-solid"
      v-bind="$attrs"
      :placeholder="range ? 'Select range date' : 'Select date'"
      :value="displayText"
      class="w-full !cursor-pointer"
    />

    <template #panel="{ close }">
      <div
        class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div v-if="range" class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(r, index) in ranges"
            :key="index"
            :label="r.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            truncate
            @click="selectRange(r)"
          />
        </div>

        <BaseFormCalendar v-model="model" @close="close" :range />
      </div>
    </template>
  </UPopover>
</template>
