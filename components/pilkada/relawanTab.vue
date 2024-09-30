<template>
  <RelawanTable
    :uid="route.params.uid"
    label="Data Relawan"
    list-type="pilkada"
    :redirect-after-edit="redirect"
  >
    <template #extra-button>
      <UButton
        :to="`/dashboard/relawan/create?redirect=${redirect}`"
        icon="i-heroicons-plus"
        label="Tambah Data"
      />
    </template>
  </RelawanTable>
</template>

<script setup>
const route = useRoute();
const redirect = computed(() => `/dashboard/pilkada/${route.params.uid}?tab=3`);
</script>
