<template>
  <div class="flex flex-col gap-8">
    <template v-if="data.length > 0">
      <component :is="chartEl" ref="chartRef" :chart-data :options />
      <div class="flex flex-wrap gap-2 justify-center">
        <div
          v-for="(v, i) in selectedLabels"
          :key="i"
          class="flex items-center gap-1"
        >
          <div
            class="size-3 rounded-full"
            :style="`background-color: ${colors[i % colors.length]}`"
          ></div>
          <BaseText class="text-slate-800 dark:text-slate-300">
            {{ v }}
          </BaseText>
        </div>
      </div>
    </template>
    <p v-else class="italic text-gray-500">Tidak ada data</p>
  </div>
</template>

<script setup lang="ts">
import { DoughnutChart, PieChart, BarChart, LineChart } from "vue-chart-3";
import { CHART_COLORS } from "~/constants/color";

const props = withDefaults(
  defineProps<{
    type: ChartType;
    labels: string[];
    data: any[];
    colors: string[];
    labelsPerData?: string[];
  }>(),
  {
    colors: () => CHART_COLORS.PRESET_1,
  }
);

const chartEl = computed(
  () =>
    ({
      doughnut: DoughnutChart,
      pie: PieChart,
      bar: BarChart,
      line: LineChart,
    }[props.type])
);

const {
  chartRef,
  chartData,
  options,
  setCircularData,
  setLineData,
  isCircularChart,
  isLineChart,
} = useChart();

watch(
  () => [props.data, props.labels],
  () => {
    if (isCircularChart(props.type))
      setCircularData(props.labels, props.data, props.colors);
    else if (isLineChart(props.type))
      setLineData(props.labels, props.data, props.colors);
  },
  { immediate: true }
);

const selectedLabels = computed(() => {
  if (isCircularChart(props.type)) return props.labels;
  else if (isLineChart(props.type)) return props.labelsPerData;
});

defineExpose({ chartRef, options });
</script>
