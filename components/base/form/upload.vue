<template>
  <div
    class="w-full flex flex-col items-center justify-center gap-4"
    :class="{ 'opacity-70': disabled }"
  >
    <div
      v-if="existedFilename && !fileData.filename"
      class="w-full border border-blue-500 border-solid rounded-lg px-4 py-4 bg-white flex items-center gap-4"
      :class="!disabled ? 'cursor-pointer' : ''"
      @click="!disabled ? openFile() : null"
      @drag="!disabled ? selectFile() : null"
      @dragend="!disabled ? selectFile() : null"
      @dragover="!disabled ? selectFile() : null"
      @drop="!disabled ? selectFile() : null"
    >
      <div class="flex items-center max-w-[90%] gap-3">
        <UIcon name="i-mdi-image" class="size-5" />
        <p
          class="font-semibold text-sm overflow-hidden text-ellipsis max-w-full"
        >
          {{ existedFilename }}
        </p>
      </div>
    </div>
    <div
      v-else-if="status === 'pending'"
      class="italic text-slate-600 w-full border border-slate-200 border-solid rounded-lg px-8 py-4 bg-white flex flex-col items-center justify-center cursor-pointer"
    >
      File sedang diupload...
    </div>
    <div
      v-else-if="status !== 'pending' && fileData.filename"
      class="w-full border border-blue-500 border-solid rounded-lg px-4 py-4 bg-white flex items-center gap-4"
    >
      <div
        @click="openFile"
        @drag="selectFile"
        @dragend="selectFile"
        @dragover="selectFile"
        @drop="selectFile"
        class="flex items-center gap-3 cursor-pointer w-full justify-between"
      >
        <div class="flex gap-3 max-w-[90%] items-center">
          <UIcon name="i-mdi-image" class="size-5" />
          <p
            v-tooltip.bottom="fileData.filename"
            class="font-semibold text-sm overflow-hidden text-ellipsis max-w-full"
          >
            {{ fileData.filename }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-full border border-slate-200 border-solid rounded-lg px-8 py-4 bg-white flex flex-col items-center justify-center cursor-pointer"
      @click="!disabled ? openFile() : null"
      @drag="!disabled ? selectFile() : null"
      @dragend="!disabled ? selectFile() : null"
      @dragover="!disabled ? selectFile() : null"
      @drop="!disabled ? selectFile() : null"
    >
      <div
        class="size-10 rounded-full flex items-center justify-center bg-slate-100"
      >
        <UIcon
          name="i-ant-design-cloud-upload-outlined"
          class="cursor-pointer size-6"
        />
      </div>
      <p class="mt-3 text-sm">
        <span class="text-[#001E9A]">Click to upload</span>
      </p>
      <p class="text-sm">{{ fileTypeText }} ({{ fileSize }})</p>
    </div>
    <input
      ref="fileRef"
      type="file"
      name="file"
      hidden
      class="hidden"
      :accept="accept"
      @change="selectFile"
    />
  </div>
</template>

<script setup>
import { postUpload } from "~/services/fileService";

const emit = defineEmits(["focus"]);
const props = defineProps({
  name: String,
  type: String,
  path: String,
  filename: {
    type: String,
    required: false,
  },
  accept: {
    type: String,
    default: "image/*",
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },
  existedFilename: String,
  onlyLink: Boolean,
  disabled: Boolean,
});
const uploadModel = defineModel({
  type: Object,
  default: null,
});

const toast = useToast();

const { fetcher, state } = postUpload();
const { data, status, execute } = useAsyncData(fetcher, {
  immediate: false,
  transform: (v) => v.data,
});

const { fileRef, fileData, openFile, selectFile, removeFile } = useLocalFile();

const fileTypeText = computed(() => {
  let text = [];
  if (props.accept.includes("png") || props.accept.includes("image/*")) {
    text.push(".png");
  }
  if (props.accept.includes("jpg") || props.accept.includes("image/*")) {
    text.push(".jpg");
  }
  if (props.accept.includes("jpeg") || props.accept.includes("image/*")) {
    text.push(".jpeg");
  }

  return text.join(", ");
});

const fileSize = computed(() => formatBytes(+props.maxSize));

function useLocalFile() {
  const fileRef = ref();
  const fileData = ref({
    filename: uploadModel.value?.filename || "",
    size: uploadModel.value?.size || 0,
    type: uploadModel.value?.type || "",
  });

  const handleUpload = async (file) => {
    let len = file.name.split(".").length - 1;

    if (props.filename) {
      newFilename = `${props.filename}.${file.name.split(".")[len]}`;
    }

    state.value.file = file;
    state.value.path = props.path;
    await execute();
  };

  const openFile = (e) => {
    fileRef.value.click();
    emit("focus", {
      target: {
        name: props.name,
      },
    });
  };
  const selectFile = async (e) => {
    const file = e.target.files[0];
    let newFilename = file.name;

    if (file.size > props.maxSize) {
      fileRef.value.value = "";
      return toast.add({
        title: `Ukuran file tidak bisa melebihi ${fileSize.value}`,
        color: "danger",
      });
    }

    // if (!props.accept.includes(file.type)) {
    //   fileRef.value.value = "";
    //   return toast.add({ title: `Ekstensi file tidak diperbolehkan` });
    // }

    fileData.value.filename = newFilename;
    fileData.value.size = file.size;
    fileData.value.type = file.type;

    const base64data = await convertFileToUrl(file);
    await handleUpload(file);

    uploadModel.value = props.onlyLink
      ? data.value
      : {
          filename: file.name,
          size: base64data.split(",")[1],
          type: props.type ? parseInt(props.type) : 0,
        };
  };

  const removeFile = () => {
    fileData.value.filename = "";
    fileData.value.size = 0;
    fileData.value.type = "";
    uploadModel.value = null;
  };

  return { fileRef, fileData, openFile, selectFile, removeFile };
}
</script>
