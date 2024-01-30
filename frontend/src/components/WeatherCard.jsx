import React, { useContext } from "react";
import { WeatherDataContext } from "../contexts/WeatherDataContext";
import WeatherImg from "./WeatherImg";
import AirIcon from "@mui/icons-material/Air";
import Humidity from "./Humidity";
import Precipitation from "./Precipitation";

function WeatherCard() {
    const { WeatherData } = useContext(WeatherDataContext);
    console.log(WeatherData);

    return (
        <>
            <div
                id="card_bg"
                className="text-red-100 flex items-center w-full justify-center h-3/4 bg-orange-400"
            >
                <div
                    id="Main_Card_bg"
                    className="flex items-center rounded-xl justify-between flex-col h-5/6 aspect-video p-10 bg-slate-800"
                >
                    {WeatherData ? (
                        <>
                            <div id="Weather_Img">
                                <WeatherImg
                                    src={`${WeatherData.weather_img}`}
                                />
                            </div>
                            <div
                                id="middle_part"
                                className="flex w-full justify-evenly text-2xl"
                            >
                                <h1 id="temp_main">
                                    {WeatherData.Temperature.celsius}
                                </h1>
                                <h1>
                                    Weather Outside: {WeatherData.description}
                                </h1>
                                <h1>{WeatherData.Time}</h1>
                            </div>

                            <div
                                id="bottom"
                                className="flex items-center justify-around  w-full text-2xl"
                            >
                                <h3 className="min-w-28">
                                    <Precipitation />
                                    <p className="inline">
                                        {WeatherData.precipitation}
                                    </p>
                                </h3>
                                <h3 className="min-w-28">
                                    <Humidity />
                                    <p className="inline">
                                        {WeatherData.humidity}
                                    </p>
                                </h3>
                                <h3>
                                    <AirIcon />
                                    <br />
                                    {WeatherData.wind}
                                </h3>
                            </div>
                        </>
                    ) : (
                        <h1 className="text-2xl">"ready to use!!!"</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default WeatherCard;
