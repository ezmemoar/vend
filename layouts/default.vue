<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="w-full min-h-screen bg-main-500 flex">
    <!-- ===== Sidebar Start ===== -->
    <LayoutsSidebar />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div class="flex-grow basis-10/12 w-10/12">
      <!-- ===== Main Content Start ===== -->
      <div class="pl-5">
        <main
          class="bg-white mt-5 py-10 px-10 max-sm:rounded-tr-3xl rounded-tl-3xl w-full min-h-screen"
        >
          <div>
            <NuxtPage />
          </div>
        </main>
      </div>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
