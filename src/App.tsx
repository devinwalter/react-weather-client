import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityWeather from "./components/CityWeather/CityWeather";
import SearchBar from "./components/SearchBar/SearchBar";
import { AppContextProvider } from "./state/AppContext";
import Sidebar from "./components/Sidebar/Sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <div className="layout">
          <main className="content">
            <SearchBar />
            <CityWeather />
          </main>

          <Sidebar />
        </div>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
