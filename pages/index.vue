<script setup>
const columns = [
  {
    key: 'name',
    label: 'name',
  },
  {
    key: 'class',
    label: 'class',
  },
]
const data = [
  {
    name: "Rizal",
    class: "10X",
  },
  {
    name: "Rizky",
    class: "11F",
  },
]
</script>

<template>
  <UContainer>
    <BaseTablePagination class="mt-5" :data :columns>
    </BaseTablePagination>
  </UContainer>
</template>