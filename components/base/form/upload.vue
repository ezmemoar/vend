<template>
  <div class="w-full flex flex-col items-center justify-center gap-4">
    <div
      class="w-full border border-slate-200 border-solid rounded-lg px-8 py-4 bg-white flex flex-col items-center justify-center cursor-pointer"
      @click="onClickOrDrag"
      @drag="onFileSelected"
      @dragend="onFileSelected"
      @dragover="onFileSelected"
      @drop="onFileSelected"
    >
      <div class="bg-gray-100 rounded-full size-10 flex items-center justify-center">
        <UIcon name="lucide:cloud-upload" class="size-6" />
      </div>
      <p class="mt-3 text-sm">
        <span class="text-[#001E9A]">Click to upload</span> / drag and drop
        dokumen
      </p>
      <p class="text-sm">
        {{ formatLabel }} (max {{ Math.floor(fileMaxSize / 1000000) }}MB)
      </p>
    </div>
    <div
      v-if="fileName"
      class="w-full border border-blue-500 border-solid rounded-lg px-4 py-4 bg-white flex items-center gap-4"
    >
      <IconFileCircle />
      <div class="flex flex-col flex-wrap flex-1">
        <p class="font-semibold text-sm line-clamp-1">{{ fileName }}</p>
      </div>
      <UIcon
        name="i-heroicons-trash-20-solid"
        class="cursor-pointer text-lg"
        @click="removeSelectedFile"
      />
    </div>
    <input
      id="file"
      ref="fileInput"
      type="file"
      name="file"
      hidden
      class="hidden"
      :accept="accept"
      @change="onFileSelected"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  accept: {
    type: String,
    default: "image/png, image/jpg, image/jpeg",
  },
  maxSize: {
    type: Number,
    default: 5000, // size in kb
  },
  type: {
    type: String,
    default: null,
  },
  formatLabel: {
    type: String,
    default: "png, jpg",
  },
});

const megabyteMultiplier = 1024;
const fileMaxSize = computed(() => +props.maxSize * megabyteMultiplier);

const uploadModel = defineModel({
  required: true,
  type: Object,
  default: { filename: "", file: 0, type: "" },
});

const fileName = ref(uploadModel.value?.filename || "");
const fileSize = ref(uploadModel.value?.file?.length || 0);
const fileInput = ref();

const onClickOrDrag = () => fileInput.value.click();

const onFileSelected = async (e) => {
  const file = e.target.files[0];
  if (file.size > fileMaxSize) return false;

  fileName.value = file.name;
  fileSize.value = file.size;

  const base64data = convertFileToUrl(file);
  uploadModel.value = {
    filename: file.name,
    file: base64data.split(",")[1],
    original: file,
    type: props.type ? parseInt(props.type) : 0,
  };
};

const removeSelectedFile = () => {
  fileName.value = null;
  fileSize.value = null;
  uploadModel.value = { filename: "", file: 0, type: "" };
};
</script>
