import type { WeatherResponse } from '~/types/weather';

export const useWeather = (city: string): Promise<WeatherResponse> => {
  return $fetch(`/api/weather`, { query: { city } });
};
