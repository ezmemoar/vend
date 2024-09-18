export const useSidebarStore = defineStore("sidebar", () => {
  const sidebarRef = ref();
  const isOpen = ref(false);

  return { sidebarRef, isOpen };
});
