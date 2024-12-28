<template>
  <UDropdown :items :popper="{ placement: 'bottom-start' }">
    <div class="flex items-center gap-3">
      <span class="hidden text-right lg:block">
        <span class="block text-sm font-medium text-black dark:text-white">
          Thomas Anree
        </span>
        <span class="block text-xs font-medium">UX Designer</span>
      </span>

      <div class="flex items-center gap-4">
        <UAvatar src="https://picsum.photos/200/200" alt="User" />
        <UIcon :name="'i-heroicons-chevron-up'" />
      </div>
    </div>
  </UDropdown>
</template>

<script setup lang="ts">
import type { DropdownItem } from "#ui/types/dropdown";

const items: DropdownItem[][] = [
  [
    {
      label: "Profile",
      icon: "i-heroicons-user-solid",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-mdi-logout",
    },
  ],
];
</script>
