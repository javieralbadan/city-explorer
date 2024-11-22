import { defineEventHandler, getQuery } from 'h3';
import { $fetch } from 'ofetch';
import type { WeatherAPIData, WeatherResponse } from '~/types/weather';

export default defineEventHandler(async (event): Promise<WeatherResponse> => {
  const { cityId } = getQuery(event);

  if (!cityId) {
    return { data: null, error: 'No cityId provided' };
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apiKey}`;

  try {
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
