import "./RecentsCard.css";

import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";

import type { OpenWeatherAPICityWeather } from "../../types/OpenWeatherAPI";
import useAppContext from "../../state/AppContext";
import type { MouseEventHandler } from "react";

interface RecentsCardProps {
  cityWeather: OpenWeatherAPICityWeather;
}

const RecentsCard = ({ cityWeather }: RecentsCardProps) => {
  const { favorites, addFavorite } = useAppContext();

  const isFavorite = favorites.find(
    (city) => city.lat === cityWeather.lat && city.lon === cityWeather.lon,
  );

  const addToFavorites: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addFavorite?.(cityWeather);
  };

  return (
    <div className="card">
      <div>
        <h6>
          {cityWeather.name}, {cityWeather.state}
        </h6>
        <div className="weather-display">
          <p>{cityWeather.main.temp}&deg;F</p>&nbsp;&middot;&nbsp;
          <p>{cityWeather.weather?.[0].main}</p>
        </div>
      </div>

      {/* favorites */}
      <button className="icon-btn" onClick={addToFavorites}>
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
