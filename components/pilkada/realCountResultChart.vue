<template>
  <UCard>
    <div>
      <BaseText type="subtitle" class="font-bold">
        Perhitungan Real Count
      </BaseText>
      <BaseText type="subtitle" class="font-normal">
        {{ data.tps_submitted }} dari {{ data.tps_total }} TPS ({{
          totalPercentage
        }})
      </BaseText>
      <BaseChart
        :component="DoughnutChart"
        :colors
        :labels
        :data="chartData"
        class="mt-5"
      />
    </div>
  </UCard>
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { CHART_1_COLORS as colors } from "~/constants/color";

const props = defineProps({
  data: Object,
});
const data = computed(() => props.data?.real_count);

const totalPercentage = computed(() =>
  !data.value.tps_submitted || !data.value.tps_total
    ? '0%'
    : createPercentage(data.value.tps_submitted, data.value.tps_total) + "%"
);

const { labels, chartData, setData } = useChart(["name", "total"]);
watch(data, setData, { immediate: true });
</script>
