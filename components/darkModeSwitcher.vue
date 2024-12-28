<template>
  <UButton variant="ghost" @click="isDark = !isDark">
    <UIcon
      v-if="isDark"
      name="i-solar-moon-bold"
      class="hidden dark:inline-block size-5 text-white"
    />
    <UIcon
      v-else
      name="i-solar-sun-bold"
      class="dark:hidden size-5 text-slate-600"
    />
  </UButton>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: () =>
    (colorMode.preference = colorMode.value === "dark" ? "light" : "dark"),
});
</script>
