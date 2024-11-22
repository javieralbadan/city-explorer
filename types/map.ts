// types/map.ts
export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MapConfig {
  center: MapCoordinates;
  zoom: number;
}
