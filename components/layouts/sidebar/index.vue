<template>
  <aside
    class="fixed left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-primary duration-300 ease-linear lg:static lg:translate-x-0 gap-5 py-8 px-5"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen,
    }"
    ref="sidebarStore.sidebarRef"
  >
  <img src="~/assets/images/logo.svg" alt="logo" class="w-full sm:w-[80%]" />
  <UVerticalNavigation :ui :links class="flex-grow" />
  <UDivider />
  <div class="w-full relative">
    <BaseListTile
      src="https://picsum.photos/200/200"
      title="Olivia Rhye"
      subtitle="olivia@untitledui.com"
      class="text-white"
    >
      <template #prefix>
        <NuxtLink to="/">
          <UIcon
            name="i-heroicons-arrow-right-start-on-rectangle"
            class="size-6"
          ></UIcon>
        </NuxtLink>
      </template>
    </BaseListTile>
  </div>
  </aside>
</template>

<script setup>
const sidebarStore = useSidebarStore();

const links = [
  {
    label: "Data PILKADA",
    icon: "i-heroicons-chart-bar-solid",
    to: "/dashboard/pilkada",
  },
  {
    label: "Data TPS",
    icon: "i-heroicons-archive-box-20-solid",
    to: "/dashboard/tps",
  },
  {
    label: "Data Calon",
    icon: "i-heroicons-user-circle-solid",
    to: "/dashboard/calon",
  },
  {
    label: "Data Relawan",
    icon: "i-heroicons-user-solid",
    to: "/dashboard/relawan",
  },
  {
    label: "Forum",
    icon: "i-heroicons-chat-bubble-left-right-solid",
    to: "/dashboard/forum",
  },
];

const ui = {
  base: "bg-transparent",
  padding: "p-3",
  inactive: "hover:before:bg-secondary text-white hover:text-white",
  active: "before:bg-secondary text-white",
  icon: {
    inactive: "text-white group-hover:text-white",
    active: "text-white",
  },
};
</script>