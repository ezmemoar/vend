<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
    <LayoutsSidebar />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Header Start ===== -->
      <LayoutsNavbar />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main class="dark:bg-slate-950 transition-colors duration-150">
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <NuxtPage />
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
