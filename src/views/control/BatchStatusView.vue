<script setup lang="ts">
import CommonTable from '@/components/CommonTable.vue';
import SearchForm from '@/components/SearchForm.vue';

</script>

<template>
  <PageHeader :title="'批次状态'" class="title-margin"/>
  <SearchForm />
  <CommonTable />
</template>

<style scoped>
.title-margin {
  margin-bottom: 10px;
}
</style>