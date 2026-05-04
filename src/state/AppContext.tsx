import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type {
  OpenWeatherAPICityOption,
  OpenWeatherAPICityWeather,
} from "../types/OpenWeatherAPI";

abstract class AppContextMethods {
  setQuery?: Dispatch<SetStateAction<string>>;
  setSelectedCity?: Dispatch<SetStateAction<OpenWeatherAPICityOption | null>>;
  addRecentCity?: (city: OpenWeatherAPICityWeather) => void;
  addFavorite?: (city: OpenWeatherAPICityWeather) => void;
  removeFavorite?: (city: OpenWeatherAPICityWeather) => void;
}

// Could use something like redux here, but too much boilerplate for a simple test app, context works great
export interface IAppContext extends AppContextMethods {
  selectedCity: OpenWeatherAPICityOption | null;
  query?: string;
  recents: OpenWeatherAPICityWeather[];
  favorites: OpenWeatherAPICityWeather[];
}

export const defaultValues: IAppContext = {
  selectedCity: null,
  query: "",
  recents: [],
  favorites: [],
};

export const AppContext = createContext<IAppContext>(defaultValues);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedCity, setSelectedCity] =
    useState<OpenWeatherAPICityOption | null>(null);
  const [recents, setRecents] = useState<OpenWeatherAPICityWeather[]>([]);
  const [favorites, setFavorites] = useState<OpenWeatherAPICityWeather[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("weather-favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [setFavorites]);

  // could probably refactor this into a factory function as they do the same thing,
  // not worth it for demo app to me, I'd probably clean up this logic as a whole in a real application
  const addRecentCity = (city: OpenWeatherAPICityWeather) =>
    setRecents((prev) => {
      const filtered = prev.filter(
        (c) => c.lat !== city.lat || c.lon !== city.lon,
      );

      return [city, ...filtered].slice(0, 5);
    });

  const addFavorite = (city: OpenWeatherAPICityWeather) =>
    setFavorites((prev) => {
      const filtered = prev.filter(
        (c) => c.lat !== city.lat || c.lon !== city.lon,
      );

      const updated = [city, ...filtered].slice(0, 5);

      // persist the same clean array in local storage for keeping "favorites" saved
      localStorage.setItem("weather-favorites", JSON.stringify(updated));

      return updated;
    });

  const removeFavorite = (city: OpenWeatherAPICityWeather) =>
    setFavorites((prev) => {
      const updated = prev.filter(
        (c) => c.lat !== city.lat || c.lon !== city.lon,
      );

      // persist
      localStorage.setItem("weather-favorites", JSON.stringify(updated));

      return updated;
    });

  // memoize values to limit rerenders, this sits at the top of our component tree, every re-render becomes expensive
  const values: IAppContext = useMemo(
    () => ({
      selectedCity,
      recents,
      favorites,
      query,
      setSelectedCity,
      addRecentCity,
      addFavorite,
      removeFavorite,
      setQuery,
    }),
    [recents, favorites, selectedCity, query],
  );

  return (
    <AppContext.Provider value={{ ...values }}>{children}</AppContext.Provider>
  );
};

export default function useAppContext(): IAppContext {
  return useContext(AppContext);
}
