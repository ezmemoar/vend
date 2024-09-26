<template>
  <div class="flex flex-col gap-4">
    <BaseText type="title">Summary Hasil PILKADA</BaseText>
    <div class="flex max-sm:flex-col gap-5">
      <UCard class="basis-1/2">
        <div>
          <BaseText type="subtitle" class="font-bold">
            Perhitungan Quick Count
          </BaseText>
          <BaseText type="subtitle" class="font-normal">175 dari 1.250 TPS (30%)</BaseText>
          <BaseChart :component="DoughnutChart" :colors :labels :data class="mt-5" />
        </div>
      </UCard>
      <UCard class="basis-1/2">
        <div>
          <BaseText type="subtitle" class="font-bold">
            Perhitungan Quick Count
          </BaseText>
          <BaseText type="subtitle" class="font-normal">175 dari 1.250 TPS (30%)</BaseText>
          <BaseChart :component="DoughnutChart" :colors :labels :data class="mt-5" />
        </div>
      </UCard>
    </div>
    <PilkadaHasilTps />
  </div>
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { CHART_1_COLORS as colors } from "~/constants/color";

const labels = ["Imam - Riri", "Supian Suri - Anis"];
const data = [125, 50];
</script>
