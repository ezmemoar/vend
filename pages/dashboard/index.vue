<template>
  <div class="grid-wrapper flex-mobile-wrapper">
    <DashboardDoughnut />
    <DashboardLine />
    <DashboardLine />
    <DashboardDoughnut />
    <DashboardTable class="col-span-2" />
  </div>
</template>

<style scoped>
.grid-wrapper {
  @apply sm:grid sm:grid-cols-2 sm:gap-5;
}

.flex-mobile-wrapper {
  @apply max-sm:flex max-sm:flex-col;
}
</style>
