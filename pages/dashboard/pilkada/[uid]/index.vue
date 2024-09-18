<template>
  <div class="flex flex-col gap-7">
    <div class="flex justify-between w-full">
      <BaseText el="h1" type="title">
        Pilkada Gubernur dan Wakil Gubernur Jawa Barat
      </BaseText>
      <div class="flex items-center gap-3">
        <UButton to="/dashboard/pilkada/1/edit" color="white" icon="i-heroicons-pencil-solid" label="Edit" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-10">
      <BaseListTile title="Level PILKADA" :subtitle="detailData.level" />
      <BaseListTile title="Provinsi" :subtitle="detailData.province" />
      <BaseListTile title="Kabupaten / Kota" :subtitle="detailData.city" />
      <BaseListTile
        title="Jumlah TPS"
        :subtitle="formatNumber(detailData.total)"
      />
    </div>

    <UTabs
      v-model="selectedTab"
      :items="tabs"
      @change="handleChangeTab"
      :ui="uiTabs"
    />
    <PilkadaSummaryTab v-if="selectedTab === 0" />
    <PilkadaCalonTab v-if="selectedTab === 1" />
    <PilkadaTpsTab v-if="selectedTab === 2" />
    <PilkadaRelawanTab v-if="selectedTab === 3" />
    <PilkadaForumTab v-if="selectedTab === 4" />
  </div>
</template>

<script setup>
const route = useRoute();

const { selectedTab, tabs, handleChangeTab } = useLocalTabs();

const uiTabs = {
  list: {
    tab: {
      active: "bg-primary text-white",
    },
  },
};

const detailData = {
  level: "Gubernur",
  province: "Jawa Barat",
  city: "-",
  total: 1250,
};

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
