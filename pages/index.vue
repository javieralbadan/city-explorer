<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import WeatherInfoCard from '@/components/WeatherInfoCard.vue';
import type { City } from '@/types/cities';
import { Layout, Typography } from 'ant-design-vue';
import { ref } from 'vue';

const { Title } = Typography;
const { Content } = Layout;

const citySelected = ref<City | null>(null);

const handleOptionSelect = (city: City) => {
  console.log('🚀 ~ handleOptionSelect ~ city:', city);
  citySelected.value = city;
};
</script>

<template>
  <Layout>
    <Content class="px-4 sm:px-6 lg:px-8 mx-auto w-full">
      <Title :level="1" class="text-center my-8">City Explorer App</Title>
      <SearchBar @select="handleOptionSelect" />
      <WeatherInfoCard :city="citySelected" />
    </Content>
  </Layout>
</template>
