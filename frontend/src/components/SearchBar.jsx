import React, { useContext, useState } from "react";
import Button from "./Button";
import Input from "./InputBar";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
function SearchBar() {
    const { setWeatherDataContext } = useContext(WeatherDataContext);
    const [CityName, setCityName] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/city/${CityName}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setWeatherDataContext(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div
                id="SearchBar"
                className=" flex justify-center h-1/4 items-center"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center"
                >
                    <Input CityName={CityName} on_click={setCityName} />
                    <Button />
                </form>
            </div>
        </>
    );
}

export default SearchBar;
