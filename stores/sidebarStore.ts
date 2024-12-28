export const useSidebarStore = defineStore("sidebar", () => {
  const isSidebarOpen = ref(false);

  const selected = useLocalStorage("selected", ref("eCommerce"));
  const page = useLocalStorage("page", ref("Dashboard"));

  const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

  return { isSidebarOpen, toggleSidebar, selected, page };
});
