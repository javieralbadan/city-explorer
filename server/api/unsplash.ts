import type { UnsplashPhoto, UnsplashResponse } from '@/types/photos';
import { defineEventHandler, getQuery } from 'h3';
import { $fetch } from 'ofetch';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = process.env.UNSPLASH_API_KEY;

export default defineEventHandler(async (event): Promise<UnsplashResponse> => {
  const { cityName } = getQuery(event);

  if (!cityName) {
    return { data: null, error: 'City name is required' };
  }

  const queryParams = new URLSearchParams({
    query: String(cityName),
    per_page: '10',
    orientation: 'landscape',
    client_id: API_KEY || '',
  });

  try {
    const finalURL = `${UNSPLASH_API_URL}?${queryParams.toString()}`;
    const response = await $fetch(finalURL);

    return {
      data: response.results.map((photo: UnsplashPhoto) => ({
        id: photo.id,
        description: photo.alt_description,
        urls: photo.urls,
      })),
      error: null,
    };
  } catch {
    return { data: null, error: 'Failed to fetch photos' };
  }
});
