"use client";


import { useState } from "react";

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  time: string;
}

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

const weatherCodeMap: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  61: "Rain",
  71: "Snow",
  80: "Rain Showers",
};

export default function WeatherChecking() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    setLoading(true);
    setError("");
    setCurrent(null);
    setForecast([]);

    try {
      // 1️⃣ Geocoding API (City → Lat/Lon)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude } = geoData.results[0];

      // 2️⃣ Current Weather
      const currentRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const currentData = await currentRes.json();
      setCurrent(currentData.current_weather);

      // 3️⃣ Weekly Forecast
      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const forecastData = await forecastRes.json();

      const weekly: DailyForecast[] =
        forecastData.daily.time.map((date: string, index: number) => ({
          date,
          maxTemp: forecastData.daily.temperature_2m_max[index],
          minTemp: forecastData.daily.temperature_2m_min[index],
          weatherCode: forecastData.daily.weathercode[index],
        }));

      setForecast(weekly);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Weather Checker
        </h2>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Check Weather
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Current Weather */}
        {current && (
          <div className="mt-6 text-center space-y-2">
            <h3 className="text-xl font-semibold">Current Weather</h3>
            <p>🌡 Temperature: <b>{current.temperature}°C</b></p>
            <p>💨 Wind Speed: <b>{current.windspeed} km/h</b></p>
            <p>🧭 Wind Direction: <b>{current.winddirection}°</b></p>
            <p className="text-sm text-gray-500">
              Updated: {current.time}
            </p>
          </div>
        )}

        {/* Weekly Forecast */}
        {forecast.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center mb-4">
              7-Day Forecast
            </h3>

            <table className="w-full border">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2 border">Day</th>
                  <th className="p-2 border">Max °C</th>
                  <th className="p-2 border">Min °C</th>
                  <th className="p-2 border">Condition</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((day, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="p-2 border">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </td>
                    <td className="p-2 border">{day.maxTemp}</td>
                    <td className="p-2 border">{day.minTemp}</td>
                    <td className="p-2 border">
                      {weatherCodeMap[day.weatherCode] || "Unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
