<template>
  <UButton @click="open" color="white" label="Lihat" />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="text-center w-full flex">
          <div class="size-6"></div>
          <BaseText type="subtitle" class="flex-1">
            Persentase Pemilihan & Lembar Saksi
          </BaseText>
          <div @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="size-6 cursor-pointer" />
          </div>
        </div>
      </template>

      <div
        v-if="status === 'pending' || status === 'idle'"
        class="w-full h-full flex justify-center items-center"
      >
        <UIcon
          name="i-tdesign-loading"
          class="size-14 animate-spin text-gray-500"
        />
      </div>
      <div v-else class="flex flex-col gap-5">
        <UCard>
          <BaseListTile
            :title="formatTrailingNumber(data.tps.number)"
            :subtitle="data.village.name"
          />

          <BaseChart
            :component="DoughnutChart"
            :colors
            :labels
            :data="chartData"
            class="mt-5"
          />
        </UCard>
        <UCard> <img :src="data.lembar_saksi" class="w-full" /> </UCard>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { CHART_1_COLORS as colors } from "~/constants/color";
import { getPilkadaResult } from "~/services/pilkadaService";

const props = defineProps({
  resultUid: String,
});

const route = useRoute();

const { params, fetcher } = getPilkadaResult();
params.value.uid = route.params.uid;
params.value.resultUid = props.resultUid;
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const { labels, chartData, setData } = useChart();
watch(data, setData);

const { isOpen, open } = useLocalModal();

function useLocalModal() {
  const isOpen = ref(false);
  const open = () => {
    execute();
    isOpen.value = true;
  };

  return { isOpen, open };
}
</script>
