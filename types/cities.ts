// types/cities.ts
export interface CityCoordinates {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  coord: CityCoordinates;
}
