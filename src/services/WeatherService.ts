import axios from "axios";
import { API_KEY, WEATHER_URL } from "../constants";

// simplifying service here, prefer class based services, but not necessary here
const weatherService = {
  fetchWeather: async (lat: number, lon: number) => {
    const res = await axios.get(WEATHER_URL, {
      params: {
        lat,
        lon,
        units: "imperial",
        appid: API_KEY,
      },
    });

    return {
      ...res.data,
      main: {
        ...res.data.main,
        feelsLike: res.data.main.feels_like,
      },
    };
  },
};

export default weatherService;
