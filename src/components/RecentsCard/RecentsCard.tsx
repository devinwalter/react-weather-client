import "./RecentsCard.css";

import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";

import type { OpenWeatherAPICityWeather } from "../../types/OpenWeatherAPI";
import useAppContext from "../../state/AppContext";
import type { MouseEventHandler } from "react";

interface RecentsCardProps {
  cityWeather: OpenWeatherAPICityWeather;
}

// bad name, ended up being both cards, not worrying about it currently
const RecentsCard = ({ cityWeather }: RecentsCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useAppContext();

  const isFavorite = favorites.some(
    (city) => city.lat === cityWeather.lat && city.lon === cityWeather.lon,
  );

  const addToFavorites: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addFavorite?.(cityWeather);
  };

  const removeFromFavorites: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    removeFavorite?.(cityWeather);
  };

  return (
    <div className="card">
      <div>
        <h6>
          {[cityWeather.name, cityWeather.state].filter(Boolean).join(", ")}
        </h6>
        {/* using weather that we have cached and saved, could use react-query
        to hold cached methods and dip into those methods, overkill for this */}
        <div className="weather-display">
          <p>{Math.floor(cityWeather.main.temp)}&deg;F</p>&nbsp;&middot;&nbsp;
          <p>{cityWeather.weather?.[0].main}</p>
        </div>
      </div>

      {/* favorites */}
      <button
        className="icon-btn"
        onClick={isFavorite ? removeFromFavorites : addToFavorites}
      >
        {isFavorite ? (
          <StarIconFilled width={32} color="#2563eb" />
        ) : (
          <StarIcon height={32} color="#000" />
        )}
      </button>
    </div>
  );
};

export default RecentsCard;
