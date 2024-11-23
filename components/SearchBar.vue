<script setup lang="ts">
import UILoader from '@/components/UILoader.vue';
import cities from '@/static/city.list.json';
import type { City } from '@/types/cities';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { AutoComplete } from 'ant-design-vue';
import type { SelectHandler } from 'ant-design-vue/es/vc-select/Select';
import { computed, ref } from 'vue';

const searchQuery = ref<string>('');
const filteredCities = ref<City[] | []>([]);
const emit = defineEmits(['select', 'reset']);

const resetState = () => {
  searchQuery.value = '';
  filteredCities.value = [];
  emit('reset');
};

const handleSearch = async (query: string) => {
  searchQuery.value = query;
  if (!query) {
    resetState();
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
  <div class="search-bar max-w-[500px] mx-auto relative">
    <ClientOnly>
      <AutoComplete
        v-model:value="searchQuery"
        :options="options"
        :filter-option="false"
        placeholder="Search for Dutch a city"
        class="w-full text-base"
        @search="handleSearch"
        @select="handleSelect"
      >
        <template #notFoundContent>
          <div class="text-center py-2">No cities found</div>
        </template>
      </AutoComplete>

      <CloseCircleOutlined
        v-if="searchQuery"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
        @click="resetState()"
      />

      <template #fallback>
        <UILoader />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.search-bar .ant-select-selector input {
  font-size: 16px;
}
</style>
