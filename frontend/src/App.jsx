import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { WeatherDataContext } from "./contexts/WeatherDataContext";

function App() {
    const [WeatherData, setWeatherDataContext] = useState("");
    return (
        <>
            <div
                id="bg"
                className="bg-[#181818] border border-[#181818] w-screen h-screen"
            >
                <WeatherDataContext.Provider
                    value={{ WeatherData, setWeatherDataContext }}
                >
                    <SearchBar />
                    <WeatherCard />
                </WeatherDataContext.Provider>
            </div>
        </>
    );
}

export default App;
