<!-- eslint-disable no-undef -->
<script setup lang="ts">
import type { MapConfig, MapCoordinates } from '@/types/map';
import { onMounted, ref, watch } from 'vue';

const CITY_ZOOM_MAP: number = 13;
const DEFAULT_MAP_SETTINGS: MapConfig = {
  center: { lat: 52.3676, lng: 4.9041 },
  zoom: 8,
};

const props = defineProps<{
  cityCoordinates: MapCoordinates | null;
}>();
const error = ref<string | null>(null);

const initializeMap = async (mapConfig: MapConfig | null) => {
  try {
    const config = mapConfig || DEFAULT_MAP_SETTINGS;
    new google.maps.Map(document.getElementById('map') as HTMLElement, config);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize map';
  }
};

watch(
  () => props.cityCoordinates,
  (newCoordinates) => {
    if (newCoordinates) {
      const { lat, lng } = newCoordinates;
      const config = {
        center: { lat, lng },
        zoom: CITY_ZOOM_MAP,
      };
      initializeMap(config);
    }
  },
  { immediate: true },
);

onMounted(() => initializeMap(null));
</script>

<template>
  <div v-if="!error" id="map" class="h-[400px] w-full mb-4 rounded-lg shadow-md" />
  <div v-else class="text-red-600 text-center">Unable to load the map</div>
</template>
