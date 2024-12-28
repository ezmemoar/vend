<template>
  <NoSsr>
    <FilePond
      ref="pondRef"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      server="/api"
    />
  </NoSsr>
</template>

<script setup lang="ts">
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

defineProps<{
  required?: boolean;
  multiple?: boolean;
  max?: number;
  maxParallelUploads?: number;
}>();

const FilePond = vueFilePond();
const model = defineModel();

const pondRef = ref();
</script>
