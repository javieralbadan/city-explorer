import { defineEventHandler, getQuery } from 'h3';
import { $fetch } from 'ofetch';
import type { WeatherAPIData, WeatherResponse } from '~/types/weather';

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

export default defineEventHandler(async (event): Promise<WeatherResponse> => {
  const { cityId } = getQuery(event);

  if (!cityId) {
    return { data: null, error: 'No cityId provided' };
  }

  try {
    const endpoint = `${BASE_URL}/weather?id=${cityId}&units=metric&appid=${API_KEY}`;
    const response = await $fetch<WeatherAPIData>(endpoint);

    return {
      data: {
        temperature: response.main.temp,
        humidity: response.main.humidity,
        description: response.weather[0].description,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: (error as Error).message || 'Failed to fetch weather data' };
  }
});
