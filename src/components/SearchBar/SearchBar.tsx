import { MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";

import "./SearchBar.css";
import useAppContext from "../../state/AppContext";
import type { OpenWeatherAPICityOption } from "../../types/OpenWeatherAPI";
import { API_KEY, GEO_URL, GEO_URL_REVERSE } from "../../constants";

const SearchBar = () => {
  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<OpenWeatherAPICityOption[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setSelectedCity } = useAppContext();
  const isSelectingRef = useRef(false);

  const onCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowSuggestions(false);
  };

  const onCitySelected = (ci: OpenWeatherAPICityOption) => {
    isSelectingRef.current = true;

    setSelectedCity?.(ci);

    const query = [ci.name, ci.state, ci.country].filter(Boolean).join(", ");

    setCity(query);
    setShowSuggestions(false);
  };

  // these fetches are pretty reactive, based on typing or getting by location,
  // for that reason I don't want to use react-query, too much change to worry about
  // caching
  const fetchCity = async (city: string) => {
    return await axios.get(GEO_URL, {
      params: {
        q: city,
        limit: 15,
        appid: API_KEY,
      },
    });
  };

  const fetchCityWithCoords = async ({
    lat,
    lon,
  }: {
    lat: Number;
    lon: number;
  }) => {
    return await axios.get(GEO_URL_REVERSE, {
      params: {
        lat,
        lon,
        limit: 15,
        appid: API_KEY,
      },
    });
  };

  const onUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (res) => {
        const city = await fetchCityWithCoords({
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        });

        // getting the first result for this demo
        setSelectedCity?.({ ...city.data[0] });
        setSuggestions([]);
        setShowSuggestions(false);
      },
      // TODO: better error handling, not for this demo
      (err) => console.log({ err }),
      { timeout: 5000 },
    );
  };

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (!city.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetchCity(city);
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [city]);

  return (
    <section className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search weather for city (ex: Nashville, TN)"
          value={city}
          onChange={onCityChange}
          name="city"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="dropdown">
            {suggestions.map((suggestion, ix) => (
              <div
                // should use a better identifier, but using index for time's sake
                key={ix}
                className="dropdown-item"
                onClick={() => onCitySelected(suggestion)}
              >
                {suggestion.name}
                {suggestion.state ? `, ${suggestion.state}` : ""},&nbsp;
                {suggestion.country}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Not doing this today, delegating to autocomplete and browser location
      <button className="btn-primary">
        <MagnifyingGlassIcon width={18} />
        Search
      </button> */}
      <button className="btn-secondary" onClick={onUseCurrentLocation}>
        <MapPinIcon width={18} />
        Use Your Location
      </button>
    </section>
  );
};

export default SearchBar;
