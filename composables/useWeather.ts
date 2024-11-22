import type { WeatherResponse } from '@/types/weather';

export const useWeather = (cityId: number): Promise<WeatherResponse> => {
  return $fetch(`/api/weather`, { query: { cityId } });
};
