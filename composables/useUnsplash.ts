import type { UnsplashResponse } from '@/types/photos';

export const useUnsplash = (cityName: string): Promise<UnsplashResponse> => {
  return $fetch('/api/unsplash', { query: { cityName } });
};
