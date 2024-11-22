<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import MapView from '@/components/MapView.vue';
import SearchBar from '@/components/SearchBar.vue';
import WeatherInfoCard from '@/components/WeatherInfoCard.vue';
import type { City } from '@/types/cities';
import { Layout, Typography } from 'ant-design-vue';
import { ref } from 'vue';
import type { MapCoordinates } from '~/types/map';

const { Title } = Typography;
const { Content } = Layout;

const citySelected = ref<City | null>(null);
const cityCoordinates = ref<MapCoordinates | null>(null);

const handleOptionSelect = (city: City) => {
  console.log('🚀 ~ handleOptionSelect ~ city:', city);
  citySelected.value = city;
  cityCoordinates.value = {
    lat: city.coord.lat,
    lng: city.coord.lon,
  };
};
</script>

<template>
  <Layout>
    <Content class="p-4 sm:p-6 lg:p-8 mx-auto w-full">
      <Title :level="1" class="text-center my-8">City Explorer App</Title>
      <ClientOnly>
        <SearchBar @select="handleOptionSelect" />
        <WeatherInfoCard :city="citySelected" />

        <Title :level="4" class="text-center my-2">Location</Title>
        <MapView :city-coordinates="cityCoordinates" />

        <template #fallback>
          <Loader />
        </template>
      </ClientOnly>
    </Content>
  </Layout>
</template>
