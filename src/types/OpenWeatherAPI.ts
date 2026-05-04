// type we use for search options
export interface OpenWeatherAPICityOption {
  country: string;
  state: string;
  name: string;
  lat: number;
  lon: number;
}

interface CurrentWeather {
  feelsLike: number;
  humidity: number;
  temp: number;
  pressure: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
}

interface Weather {
  main: string;
  description: string;
  icon: string;
}

// actual weather interface normalized a little bit
export interface OpenWeatherAPIWeather {
  clouds: Clouds;
  main: CurrentWeather;
  wind: Wind;
  weather: Weather[];
  visibility: number;
  dt: number;
}

// used for recents and favorites
export type OpenWeatherAPICityWeather = OpenWeatherAPICityOption &
  Pick<OpenWeatherAPIWeather, "main" | "weather">;
