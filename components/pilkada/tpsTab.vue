<template>
  <TpsTable label="Data TPS" :redirect-after-edit="redirect" />
</template>

<script setup>
const route = useRoute();
const redirect = computed(() => `/dashboard/pilkada/${route.params.uid}?tab=2`);
</script>
