// types/cities.ts
export interface City {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
}
