import "./CityWeather.css";

import { useQuery } from "@tanstack/react-query";
import {
  BeakerIcon,
  PaperAirplaneIcon,
  ScaleIcon,
  EyeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

import useAppContext from "../../state/AppContext";
import weatherService from "../../services/WeatherService";

import { type OpenWeatherAPIWeather } from "../../types/OpenWeatherAPI";
import { useEffect, useState } from "react";
import {
  PRESSURE_MAGIC_NUMBER,
  VISIBILITY_MILES_CONVERSION,
} from "../../constants";

// Could be refactored to separate components to make smaller, cleaner, and more focused, we aren't reusing them currently, so no reason to right now IMO
const CityWeather = () => {
  const [refreshDate, setRefreshDate] = useState<Date>();
  const { selectedCity, addRecentCity } = useAppContext();
  // in a real application I would want to normalize this data more than I am
  // this would eliminate the need for guarding data objects with ! everywhere like I'm currently doing
  const { data, isLoading, isSuccess, error, refetch } =
    useQuery<OpenWeatherAPIWeather>({
      queryKey: ["weather", selectedCity?.lat, selectedCity?.lon],
      queryFn: () =>
        weatherService.fetchWeather(selectedCity!.lat, selectedCity!.lon),
      enabled: !!selectedCity,
    });

  // add to recents on successful network trip
  useEffect(() => {
    if (isSuccess && data && selectedCity) {
      const cityWeather = { ...selectedCity, ...data };
      addRecentCity?.(cityWeather!);
    }
  }, [isSuccess, data, selectedCity]);

  const lastUpdatedDate = new Date(data?.dt! * 1000).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const lastRefreshedDate = refreshDate?.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const iconUrl = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@4x.png`;

  // OpenWeatherAPI doesn't always give an updated timestamp weather, it only updates on an interval, keep track in the UI of refresh data
  const refetchWeather = () => {
    refetch();
    setRefreshDate(new Date());
  };

  if (!selectedCity) {
    return (
      <section className="container weather-container">
        Please choose a city to get started.
      </section>
    );
  }

  if (error) {
    return (
      <section className="container weather-container">
        Error with your city selection, please try again.
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="container weather-container">
        <div className="spinner"></div>
      </section>
    );
  }

  // I would change this layout after looking through it and having the white space, move the "extra" section inline with the "weather" section
  // I'm not going to spend the time to do that for this one, I'm just eating the white space
  return (
    <section className="container weather-container">
      <div className="selected-city">
        <h4>
          {selectedCity.name}, {selectedCity.state}
        </h4>

        <p>{lastUpdatedDate}</p>

        <button
          onClick={refetchWeather}
          title={lastRefreshedDate && `Last Refreshed on ${lastRefreshedDate}`}
        >
          <ArrowPathIcon width={32} color="#000" />
        </button>
      </div>
      <div className="weather">
        <div>
          <img src={iconUrl} alt={data?.weather[0].description} />
        </div>
        <div className="details">
          <div className="temp">
            <span className="value">{Math.floor(data?.main?.temp!)}</span>
            <span className="unit">&deg;F</span>
          </div>
          <p>{data?.weather?.[0]?.main}</p>
          <p>Feels like {Math.floor(data?.main?.feelsLike!)}&deg;F</p>
        </div>
      </div>
      <div className="extra">
        <div>
          <BeakerIcon width={32} />
          Humidity
          <span className="unit">{Math.floor(data?.main?.humidity!)}&#37;</span>
        </div>
        <div>
          <PaperAirplaneIcon width={32} />
          Wind
          <span className="unit">{Math.floor(data?.wind?.speed!)}mph</span>
        </div>
        <div>
          <ScaleIcon width={32} />
          Pressure
          <span className="unit">
            {(data?.main.pressure! * PRESSURE_MAGIC_NUMBER).toFixed(2)}in
          </span>
        </div>
        <div>
          <EyeIcon width={32} />
          Visibility
          <span className="unit">
            {Math.min(
              data?.visibility! * VISIBILITY_MILES_CONVERSION,
              6.2,
            ).toFixed(1)}
            mi
          </span>
        </div>
      </div>
      {data?.dt && (
        <div className="last-updated">Last updated on {lastUpdatedDate}</div>
      )}
    </section>
  );
};

export default CityWeather;
