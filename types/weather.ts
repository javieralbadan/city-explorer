// types/weather.ts
interface Weather {
  temperature: number;
  humidity: number;
  description: string;
}

export interface WeatherAPIData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

export interface WeatherResponse {
  data: Weather | null;
  error: string | null;
}
