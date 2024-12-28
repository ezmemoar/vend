<template>
  <UCard>
    <div class="flex max-sm:flex-col gap-3 items-center justify-between">
      <h2 class="font-bold">Data Line</h2>
      <UTabs v-model="tabIndex" :items />
    </div>
    <div class="mt-5">
      <BaseChart
        type="line"
        :labels="selectedTab.labels"
        :labels-per-data="['John Doe', 'Jack']"
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
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = [
    [100, 200, 300, 250, 450, 70, 220, 240, 300, 380, 440, 520],
    [200, 320, 350, 330, 400, 420, 400, 380, 250, 280, 330, 350],
  ];

  return { labels, data };
}

function useLocalMonthData() {
  const labels = ["1", "2", "3", "4", "5"];

  const data = [
    [220, 240, 300, 380, 520],
    [200, 330, 280, 330, 350],
  ];

  return { labels, data };
}
</script>
