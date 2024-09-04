<template>
  <UInput
    v-model="model"
    :type="isShow ? 'text' : 'password'"
    :ui="{ icon: { trailing: { pointer: '', padding: '' } } }"
  >
    <template #trailing>
      <UButton
        color="gray"
        variant="ghost"
        class="px-3 py-2 mr-1"
        @click="isShow = !isShow"
      >
        <UIcon :name="isShow ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" />
      </UButton>
    </template>
  </UInput>
</template>

<script setup>
const model = defineModel();
const isShow = ref(false);
</script>
