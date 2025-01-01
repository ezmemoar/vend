<script setup lang="ts">
import type { FilePondFile } from "filepond";
import VueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

const props = withDefaults(
  defineProps<{
    async?: boolean;
    multiple?: boolean;
    accept?: ExtensionFileForm[];
    max?: number;
    maxParallelUploads?: number;
  }>(),
  {
    accept: () => ["jpeg", "jpg", "png"],
  }
);

// Create component
const FilePond = VueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const model = defineModel<File>();

const initialFile = unref(model.value);

const options = { storeAsFile: true };

const validationType = computed(() => {
  let types: string[] = [];

  for (let v of props.accept) {
    types.push(EXTENSION[v.toUpperCase()]);
  }

  return [...new Set(types)].join(",");
});

const onRemoveFile = async (err: any, file: FilePondFile) => {
  model.value = undefined;
};

const onAddFileStart = async (file: FilePondFile) => {
  model.value = file.file as File;
};

onBeforeMount(() => {
  if (props.async) {
    options.storeAsFile = false;
  }
});
</script>

<template>
  <FilePond
    v-bind="options"
    :accepted-file-types="validationType"
    label-idle="Drop files here..."
    :allow-multiple="props.multiple"
    :max-parallel-uploads="props.maxParallelUploads"
    :files="initialFile"
    @addfilestart="onAddFileStart"
    @removefile="onRemoveFile"
  />
</template>
