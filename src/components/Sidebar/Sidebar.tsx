import "./Sidebar.css";

import { useState } from "react";
import useAppContext from "../../state/AppContext";
import RecentsCard from "../RecentsCard/RecentsCard";

const Sidebar = () => {
  // I would probably use routing and set query params here instead of local state in a real application
  // that way, we could save the users "Preference", and a refresh doesn't reset this state variable
  const [tab, setTab] = useState<"recents" | "favorites">("recents");
  const { recents, favorites, setSelectedCity } = useAppContext();

  const cities = tab === "recents" ? recents : favorites;

  return (
    <aside className="sidebar container">
      <div className="tabs">
        <button
          className={tab === "recents" ? "active" : ""}
          onClick={() => setTab("recents")}
        >
          Recents
        </button>

        <button
          className={tab === "favorites" ? "active" : ""}
          onClick={() => setTab("favorites")}
        >
          Favorites
        </button>
      </div>

      <div className="list">
        {cities.length === 0 ? (
          <p className="empty">No {tab} yet</p>
        ) : (
          cities.map((city) => (
            <div
              key={`${city.lat}-${city.lon}`}
              className="list-item"
              onClick={() => setSelectedCity?.(city)}
            >
              <RecentsCard cityWeather={city} />
            </div>
          ))
        )}
      </div>

      <p className="disclaimer">
        You can have up to 5 favorites and 5 recents.
      </p>
    </aside>
  );
};

export default Sidebar;
