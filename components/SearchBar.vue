<script setup lang="ts">
import cities from '@/static/city.list.json';
import { AutoComplete, Spin } from 'ant-design-vue';
import type { SelectHandler } from 'ant-design-vue/es/vc-select/Select';
import { computed, ref } from 'vue';
import type { City } from '~/types/cities';

const searchQuery = ref<string>('');
const filteredCities = ref<City[] | []>([]);
const loading = ref<boolean>(false);

const emit = defineEmits(['select']);

const handleSearch = async (query: string) => {
  searchQuery.value = query;
  if (!query) {
    filteredCities.value = [];
    return;
  }

  loading.value = true;

  filteredCities.value = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase()),
  );
  loading.value = false;
};

const handleSelect: SelectHandler = (cityId: number) => {
  const selectedCity = filteredCities.value.find((city) => city.id === cityId);
  if (selectedCity) {
    emit('select', selectedCity);
    searchQuery.value = selectedCity.name;
  }
};

const options = computed(() =>
  filteredCities.value.map((city) => ({
    value: city.id,
    label: city.name,
  })),
);
</script>

<template>
  <div class="search-bar max-w-[500px] mx-auto">
    <AutoComplete
      v-model:value="searchQuery"
      :options="options"
      :filter-option="false"
      @search="handleSearch"
      @select="handleSelect"
      placeholder="Search for Dutch a city"
      class="w-full"
    >
      <template #notFoundContent>
        <div class="text-center py-2">No cities found</div>
      </template>
    </AutoComplete>

    <div v-if="loading" class="flex justify-center items-center mt-2">
      <Spin size="small" /> <span class="ml-2 text-gray-600">Loading...</span>
    </div>
  </div>
</template>
