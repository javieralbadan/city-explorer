<script setup lang="ts">
import { useWeather } from '@/composables/useWeather';
import type { WeatherResponse } from '@/types/weather';
import { onMounted, ref } from 'vue';

const city = 'Amsterdam';
const weather = ref<{ temperature: number; humidity: number; description: string } | null>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  const { data, error: fetchError }: WeatherResponse = await useWeather(city);
  if (fetchError) {
    error.value = fetchError;
  } else {
    weather.value = data;
  }
});
</script>

<template>
  <div class="max-w-[400px] my-4 mx-auto">
    <h1>Weather Information</h1>
    <p>Temperature (°C): {{ weather?.temperature }}</p>
    <p>Humidity (%): {{ weather?.humidity }}</p>
    <p>Description: {{ weather?.description }}</p>
  </div>
</template>
