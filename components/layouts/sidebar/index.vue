<template>
  <aside
    class="absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-800 transition-all duration-150 ease-linear dark:bg-slate-900 lg:static lg:translate-x-0"
    :class="{
      'translate-x-0 dark:border-slate-800 dark:border-r':
        sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen,
    }"
    ref="targetRef"
  >
    <div class="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
      <NuxtLink to="/" class="text-white"> Logo </NuxtLink>
      <UButton
        variant="ghost"
        class="block lg:hidden text-white hover:bg-transparent"
        icon="i-heroicons-arrow-left"
        @click="sidebarStore.isSidebarOpen = false"
      />
    </div>

    <div class="px-6 mt-3">
      <UVerticalNavigation :links />
    </div>
  </aside>
</template>

<script setup lang="ts">
const sidebarStore = useSidebarStore();

const links = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: "i-heroicons-squares-2x2",
  },
  {
    label: "User",
    to: "/dashboard/user",
    icon: "i-heroicons-user",
  },
];

const targetRef = ref<HTMLElement>();
onClickOutside(targetRef, () => (sidebarStore.isSidebarOpen = false));
</script>
