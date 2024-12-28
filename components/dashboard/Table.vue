<template>
  <UCard>
    <div class="flex justify-between items-center">
      <h2 class="font-bold">Data Pokemon</h2>
      <UPopover>
        <UButton variant="outline" icon="i-mdi-filter" label="filter" />

        <template #panel>
          <UForm class="p-4 grid grid-cols-2 gap-5 w-[50vw] min-h-[30vh]">
            <UFormGroup label="Status">
              <USelectMenu :options="[{ label: 'data 1', value: 'data1' }]" />
            </UFormGroup>
            <div class="col-span-2">
              <UButton type="submit" label="Submit" />
            </div>
          </UForm>
        </template>
      </UPopover>
    </div>
    <div class="mt-5">
      <BaseTablePagination
        :columns
        :data="data?.results ?? []"
        :loading="status === 'pending'"
      />
    </div>
  </UCard>
</template>

<script setup>
const { $api } = useNuxtApp();
const route = useRoute();

const columns = [
  {
    label: "No",
    key: "no",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "URL",
    key: "url",
  },
];

// const columns = [
//   {
//     label: "Project Space",
//     key: "project_space",
//   },
//   {
//     label: "Task Name",
//     key: "task_name",
//   },
//   {
//     label: "Status",
//     key: "status",
//   },
//   {
//     label: "Assigned to",
//     key: "assigned_to",
//   },
//   {
//     label: "Report by",
//     key: "report_by",
//   },
// ];

const { data, status } = useAsyncData(() => $api("/pokemon"), {
  watch: [computed(() => route.query)],
});
</script>
