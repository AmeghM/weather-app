import React, { useState, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { CiCloudSun } from "react-icons/ci";
import { BsFillCloudSunFill } from "react-icons/bs";
import { IoRainyOutline } from "react-icons/io5";
import { BsCloudSnow } from "react-icons/bs";
import { IoThunderstormOutline } from "react-icons/io5";
import { BsDroplet } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { LuGlassWater } from "react-icons/lu";
import { CiSun } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

import "./App.css";

function App() {
  const apiKey = "64f4b907640be4714a344e3db643b8fa";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (cityName = city) => {
    if (!cityName) {
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    setWeatherData(data);
    console.log(data);
  };

  useEffect(() => {
    getWeatherData("Kochi");
  }, []);

  const weatherIcon = (ic) => {
    switch (ic) {
      case "Clear":
        return <IoSunny className="text-9xl" />;
      case "Sunny":
        return <IoSunny className="text-9xl" />;
      case "Clouds":
        return <BsFillCloudSunFill className="text-9xl" />;
      case "Rain":
        return <IoRainyOutline className="text-9xl" />;
      case "Snow":
        return <BsCloudSnow className="text-9xl" />;
      case "Thunderstorm":
        return <IoThunderstormOutline className="text-9xl" />;

      default:
        return <CiCloudSun className="text-9xl" />;
    }
  };
  return (
    <>
      <div className="relative flex justify-center items-center px-4 min-h-screen bg-weather-gradient">
        <div className="max-w-5xl w-full shadow-2xl p-8 bg-weather-gradient backdrop-blur-sm rounded-2xl border-white/30 space-y-6">
          <div className="flex flex-row justify-between items-center gap-4 relative ">
            <h1 className="text-3xl font-bold text-white">Weather</h1>
            <div className="w-auto relative">
              <div className="flex items-center  space-x-2">
                <input
                  type="text"
                  placeholder="Enter the city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/40 text-gray-600 border  border-white/70 rounded-xl px-4 py-2  focus:ring-blue-500 focus:outline-none focus:ring-2"
                />

                <button
                  className="p-3 rounded-full bg-sky-600 hover:bg-white group "
                  onClick={() => getWeatherData()}
                >
                  <FaSearch className="text-white group-hover:text-sky-600" />
                </button>
              </div>
            </div>
          </div>
          {/* weather */}
          {weatherData && weatherData.main && (
            <div className="flex flex-row justify-between items-center bg-weather-gradient backdrop-blur-sm rounded-xl shadow-xl p-6 space-y-0">
              <div className="space-y-2 text-center md:text-left ms-3 ">
                <div className="flex items-start  justify-center md:justify-start space-x-2 ">
                  <h2 className="text-7xl text-white font-bold">
                    {Math.round(weatherData.main.temp)}
                  </h2>
                  <span className="text-7xl text-white font-bold">°C</span>
                </div>
                <h3 className="text-white text-2xl font-medium">
                  {weatherData.name}, {weatherData.sys.country}
                </h3>
                <h4 className="text-white text-xl ">
                  {weatherData.weather[0].main}
                </h4>
                <h5 className="text-white ">
                  {weatherData.weather[0].description}
                </h5>
              </div>
              <div className="text-white me-10">
                {weatherData && weatherIcon(weatherData.weather[0].main)}
              </div>
            </div>
          )}
          {/* info */}
          {weatherData && weatherData.main && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <WeatherBox
                icon={<BsDroplet className="text-4xl" />}
                title={"Humidity"}
                value={`${weatherData.main.humidity} %`}
              />
              <WeatherBox
                icon={<FiWind className="text-4xl" />}
                title={"Wind"}
                value={`${weatherData.wind.speed} km/h`}
              />
              <WeatherBox
                icon={<LuGlassWater className="text-4xl" />}
                title={"Pressure"}
                value={`${weatherData.main.pressure} hPa`}
              />
              <WeatherBox
                icon={<CiSun className="text-4xl" />}
                title={"FeelsLike"}
                value={`${weatherData.main.feels_like} °C`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function WeatherBox({ icon, title, value }) {
  return (
    <>
      <div className="flex flex-col items-center rounded-2xl p-4 border border-white/20  shadow-2xl backdrop-blur-sm space-y-2 hover:scale-105 transition-transform">
        <div className="text-white">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="font-bold text-2xl">{value}</p>
      </div>
    </>
  );
}

export default App;
