<template>
  <ForumTable
    :uid="route.params.uid"
    label="Forum"
    :redirect-after-edit="redirect"
  >
    <template #extra-button>
      <UButton
        :to="`/dashboard/forum/create?redirect=${redirect}`"
        icon="i-heroicons-plus"
        label="Tambah Data"
      />
    </template>
  </ForumTable>
</template>

<script setup>
const route = useRoute();
const redirect = computed(() => `/dashboard/pilkada/${route.params.uid}?tab=4`);
</script>
