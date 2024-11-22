<script setup lang="ts">
import UILoader from '@/components/UILoader.vue';
import { useWeather } from '@/composables/useWeather';
import type { City } from '@/types/cities';
import type { Weather, WeatherResponse } from '@/types/weather';
import { CloudOutlined } from '@ant-design/icons-vue';
import { Card } from 'ant-design-vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  city: City | null;
}>();

const weather = ref<Weather | null>(null);
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

const fetchWeatherData = async (city: City | null) => {
  if (!city?.id) return;

  try {
    loading.value = true;
    const { data, error: fetchError }: WeatherResponse = await useWeather(city?.id);
    if (fetchError) {
      error.value = fetchError;
    } else {
      weather.value = data;
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unknown error occurred';
  } finally {
    loading.value = false;
  }
};

watch(() => props.city, fetchWeatherData, { immediate: true });
</script>

<template>
  <Card class="max-w-[400px] my-4 mx-auto text-center">
    <template #title>Weather {{ city?.name ? `in ${city.name}` : 'Information' }}</template>
    <UILoader v-if="loading" />
    <p v-else-if="error">{{ error }}</p>
    <template v-else-if="weather">
      <p>Temperature: {{ weather.temperature }}°C</p>
      <p>Humidity: {{ weather.humidity }}%</p>
      <p>Description: {{ weather.description }}</p>
    </template>
    <template v-else>
      <CloudOutlined class="text-center" style="font-size: 30px" />
      <p>Please search for a city to view weather information.</p>
    </template>
  </Card>
</template>
