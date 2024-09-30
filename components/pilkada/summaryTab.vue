<template>
  <div class="flex flex-col gap-4">
    <BaseText type="title">Summary Hasil PILKADA</BaseText>
    <div class="flex max-sm:flex-col gap-5">
      <PilkadaQuickCountResultChart :data class="basis-1/2" />
      <PilkadaRealCountResultChart :data class="basis-1/2" />
    </div>
    <PilkadaHasilTps />
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>
