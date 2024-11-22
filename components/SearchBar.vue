<script setup lang="ts">
import UILoader from '@/components/UILoader.vue';
import cities from '@/static/city.list.json';
import { AutoComplete } from 'ant-design-vue';
import type { SelectHandler } from 'ant-design-vue/es/vc-select/Select';
import { computed, ref } from 'vue';
import type { City } from '~/types/cities';

const searchQuery = ref<string>('');
const filteredCities = ref<City[] | []>([]);
const emit = defineEmits(['select']);

const handleSearch = async (query: string) => {
  searchQuery.value = query;
  if (!query) {
    filteredCities.value = [];
    return;
  }

  filteredCities.value = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase()),
  );
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
    <ClientOnly>
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

      <template #fallback>
        <UILoader />
      </template>
    </ClientOnly>
  </div>
</template>
