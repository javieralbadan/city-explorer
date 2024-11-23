<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import ImagesGallery from '@/components/ImagesGallery.vue';
import MapView from '@/components/MapView.vue';
import SearchBar from '@/components/SearchBar.vue';
import UILoader from '@/components/UILoader.vue';
import WeatherInfoCard from '@/components/WeatherInfoCard.vue';
import type { City } from '@/types/cities';
import type { MapCoordinates } from '@/types/map';
import { Layout, Typography } from 'ant-design-vue';
import { ref } from 'vue';

const { Title } = Typography;
const { Content } = Layout;

const citySelected = ref<City | null>(null);
const cityCoordinates = ref<MapCoordinates | null>(null);
const cityName = ref<string>('');

const handleOptionSelect = (city: City) => {
  citySelected.value = city;
  cityName.value = city.name;
  cityCoordinates.value = {
    lat: city.coord.lat,
    lng: city.coord.lon,
  };
};

const resetSelectedCity = () => {
  citySelected.value = null;
  cityName.value = '';
  cityCoordinates.value = null;
};
</script>

<template>
  <Layout>
    <Content class="p-4 pb-6 sm:p-6 lg:p-8 mx-auto w-full">
      <Title :level="1" class="text-center my-8">City Explorer App</Title>
      <ClientOnly>
        <SearchBar @select="handleOptionSelect" @reset="resetSelectedCity" />
        <WeatherInfoCard :city="citySelected" />

        <Title :level="4" class="text-center my-2">Location</Title>
        <MapView :city-coordinates="cityCoordinates" />

        <template v-if="cityName">
          <Title :level="4" class="text-center my-2">Images</Title>
          <ImagesGallery :city-name="cityName" />
        </template>

        <template #fallback>
          <UILoader />
        </template>
      </ClientOnly>
    </Content>

    <AppFooter />
  </Layout>
</template>
