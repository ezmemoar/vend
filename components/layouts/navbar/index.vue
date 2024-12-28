<template>
  <header
    class="sticky top-0 z-40 flex w-full bg-white shadow dark:bg-slate-900 dark:shadow-none transition-colors duration-150"
  >
    <div
      class="flex flex-grow items-center justify-between p-4 shadow-md md:px-6 2xl:px-11"
    >
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <UButton
          variant="ghost"
          class="z-[99999] text-black dark:text-white block bg-white p-1.5 shadow-sm dark:bg-slate-900 lg:hidden translate-y-1"
          icon="i-mdi-menu"
          @click="toggleSidebar"
        />
        <NuxtLink class="block flex-shrink-0 lg:hidden" to="/"> Logo </NuxtLink>
      </div>

      <div class="flex items-center justify-end gap-3 2xl:gap-7 w-full">
        <DarkModeSwitcher />
        <LayoutsNavbarUser />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { toggleSidebar } = useSidebarStore();
</script>
