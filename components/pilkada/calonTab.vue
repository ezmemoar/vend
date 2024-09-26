<template>
  <CalonTable
    label="Data Calon PILKADA"
    list-type="pilkada"
    :redirect-after-edit="redirect"
  >
    <template #extra-button>
      <UButton
        :to="`/dashboard/calon/create?redirect=${redirect}`"
        icon="i-heroicons-plus"
        label="Tambah Data"
      />
    </template>
  </CalonTable>
</template>

<script setup>
const route = useRoute();
const redirect = computed(() => `/dashboard/pilkada/${route.params.uid}?tab=1`);
</script>
