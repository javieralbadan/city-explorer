<script setup lang="ts">
import UILoader from '@/components/UILoader.vue';
import { useUnsplash } from '@/composables/useUnsplash';
import type { GalleryItem, PhotoUrls, UnsplashResponse } from '@/types/photos';
import { Carousel } from 'ant-design-vue';
import { ref, watch } from 'vue';

const props = defineProps<{
  cityName: string;
}>();

const photos = ref<GalleryItem[] | null>(null);
const error = ref<string | null>(null);
const loading = ref<boolean>(false);

const getImageUrl = (urls: PhotoUrls) => {
  const width = window.innerWidth;

  if (width >= 1200) {
    return urls.full;
  } else if (width >= 768) {
    return urls.regular;
  } else {
    return urls.small;
  }
};

const fetchPhotos = async (cityName: string) => {
  if (!cityName) return;

  try {
    loading.value = true;
    const { data, error: fetchError }: UnsplashResponse = await useUnsplash(cityName);
    if (fetchError) {
      error.value = fetchError;
    } else {
      photos.value = data;
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unknown error occurred';
  } finally {
    loading.value = false;
  }
};

watch(() => props.cityName, fetchPhotos, { immediate: true });
</script>

<template>
  <div class="max-w-[600px] mx-auto my-4 mb-8">
    <UILoader v-if="loading" />
    <p v-else-if="error">{{ error }}</p>
    <Carousel
      v-else-if="photos && photos.length"
      autoplay
      arrows
      dotPosition="top"
      class="rounded-lg shadow-lg"
    >
      <div v-for="photo in photos" :key="photo.id">
        <div class="relative w-full h-[300px] overflow-hidden">
          <img
            :src="getImageUrl(photo.urls)"
            :alt="photo.description || 'Photo from Unsplash'"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm px-2 py-1"
          >
            {{ photo.description || 'No description available' }}
          </div>
        </div>
      </div>
    </Carousel>
  </div>
</template>
