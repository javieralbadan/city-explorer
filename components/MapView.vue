<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { MapConfig, MapCoordinates } from '~/types/map';

const CITY_ZOOM_MAP: number = 13;
const DEFAULT_MAP_SETTINGS: MapConfig = {
  center: { lat: 52.3676, lng: 4.9041 },
  zoom: 5,
};

const props = defineProps<{
  cityCoordinates: MapCoordinates | null;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const error = ref<string | null>(null);

const initializeMap = async ({ lat, lng }: MapCoordinates) => {
  if (!mapContainer.value) return;

  let config: MapConfig;
  if (!lat || !lng) {
    config = DEFAULT_MAP_SETTINGS;
  }

  try {
    config = {
      center: { lat, lng },
      zoom: CITY_ZOOM_MAP,
    };
    map.value = new google.maps.Map(document.getElementById('map') as HTMLElement, config);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize map';
  }
};

watch(
  () => props.cityCoordinates,
  (newCoordinates) => {
    if (newCoordinates) {
      const { lat, lng } = newCoordinates;
      initializeMap({ lat, lng });
    }
  },
  { immediate: true },
);

onMounted(() => {
  initializeMap(DEFAULT_MAP_SETTINGS.center);
});
</script>

<template>
  <div v-if="error" class="text-red-500 text-center">Error: {{ error }}</div>
  <div v-else ref="mapContainer" id="map" class="h-[400px] w-full rounded-lg shadow-md" />
</template>
