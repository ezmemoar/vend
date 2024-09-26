<template>
  <div class="flex gap-8">
    <component :is="props.component" ref="chartRef" :chart-data :options class="basis-1/3" />
    <div class="basis-2/3 flex flex-col gap-1">
      <div v-for="(v, i) in labels" :key="i" class="flex items-center gap-2">
        <div
          class="size-4 rounded-full"
          :style="`background-color: ${colors[i]}`"
        ></div>
        <BaseText class="text-gray-600">{{ v }} ({{ setPercentage(i) }})</BaseText>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  component: Object,
  labels: Array,
  data: Array,
  // taken from color.js constant
  colors: Array,
});

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const chartRef = ref();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{ data: props.data, backgroundColor: props.colors }],
}));

const setPercentage = (i) => {
  const selected = chartData.value.datasets[0].data[i];
  const total = chartData.value.datasets[0].data.reduce((a, v) => (a += +v), 0);

  const res = formatNumber((selected / total) * 100);
  return `${res}%`;
};

defineExpose({ chartRef });
</script>
