<script setup>
definePageMeta({
  middleware: "is-authenticated",
});

onMounted(() => navigateTo("/dashboard/pilkada"));
</script>
