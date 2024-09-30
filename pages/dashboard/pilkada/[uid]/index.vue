<template>
  <div
    v-if="status === 'pending' || status === 'idle'"
    class="w-full flex justify-center"
  >
    <UIcon
      name="i-tdesign-loading"
      class="size-14 animate-spin text-gray-500"
    />
  </div>
  <div v-else class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">
        {{ data.name }}
      </BaseText>
      <div class="flex items-center gap-3">
        <UButton
          :to="`/dashboard/pilkada/${route.params.uid}/edit`"
          color="white"
          icon="i-heroicons-pencil-solid"
          label="Edit"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-10">
      <BaseListTile
        title="Level PILKADA"
        :subtitle="data.election_type.value"
      />
      <BaseListTile title="Provinsi" :subtitle="data.province.name" />
      <BaseListTile title="Kabupaten / Kota" :subtitle="data.regency.name" />
      <BaseListTile
        title="Jumlah TPS"
        :subtitle="formatNumber(data.tps_submitted)"
      />
    </div>

    <UTabs v-model="selectedTab" :items="tabs" @change="handleChangeTab" :ui />
    <PilkadaSummaryTab v-if="selectedTab === 0" :data />
    <PilkadaCalonTab v-if="selectedTab === 1" />
    <PilkadaTpsTab v-if="selectedTab === 2" />
    <PilkadaRelawanTab v-if="selectedTab === 3" />
    <PilkadaForumTab v-if="selectedTab === 4" />
  </div>
</template>

<script setup>
import { getPilkada } from "~/services/pilkadaService";

const route = useRoute();

const { selectedTab, tabs, handleChangeTab } = useLocalTabs();

const ui = {
  list: {
    tab: {
      active: "bg-primary text-white",
    },
  },
};

const { params, fetcher } = getPilkada();
params.value.uid = route.params.uid;
const { data, status } = useAsyncData(`pilkada-${params.value.uid}`, fetcher, {
  transform: (v) => v.data,
});

function useLocalTabs() {
  const selectedTab = ref(route.query?.tab ? +route.query.tab : 0);

  const tabs = [
    {
      label: "Summary PILKADA",
    },
    {
      label: "Data Calon",
    },
    {
      label: "Data TPS",
    },
    {
      label: "Data Relawan",
    },
    {
      label: "Forum",
    },
  ];

  const handleChangeTab = (tab) => {
    selectedTab.value = tab;
    navigateTo(`/dashboard/pilkada/${route.params.uid}?tab=${tab}`);
  };

  return { selectedTab, tabs, handleChangeTab };
}
</script>
