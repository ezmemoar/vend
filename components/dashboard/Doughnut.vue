<template>
  <UCard>
    <div class="flex max-sm:flex-col gap-3 items-center justify-between">
      <h2 class="font-bold">Data Doughnut</h2>
      <UTabs v-model="tabIndex" :items />
    </div>
    <div class="mt-5">
      <BaseChart
        type="doughnut"
        :labels="selectedTab.labels"
        :data="selectedTab.data"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { labels: yearLabels, data: yearData } = useLocalYearData();
const { labels: monthLabels, data: monthData } = useLocalMonthData();
const { tabIndex, items, selectedTab } = useLocalTab();

function useLocalTab() {
  const tabIndex = ref(0);
  const items = [{ label: "Tahun ini" }, { label: "Bulan ini" }];

  const selectedTab = computed(() =>
    tabIndex.value === 0
      ? {
          labels: yearLabels,
          data: yearData,
        }
      : {
          labels: monthLabels,
          data: monthData,
        }
  );

  return { tabIndex, items, selectedTab };
}

function useLocalYearData() {
  const labels = ["John Doe", "Jack Doe"];
  const data = [[100, 200]];

  return { labels, data };
}

function useLocalMonthData() {
  const labels = ["John Doe", "Jack Doe"];
  const data = [[220, 240]];

  return { labels, data };
}
</script>
