"use client";

import { useEffect, useState } from "react";

export default function WeatherPage() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        // Demo location for now
        // Later we can connect farmer's actual location.
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.45&longitude=79.12&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto"
        );

        if (!response.ok) {
          throw new Error("Weather service unavailable");
        }

        const data = await response.json();

        setWeather(data);
      } catch (err) {
        setError("Weather information could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const getWeatherText = (code) => {
    if (code === 0) return "Clear Sky";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain Showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";

    return "Unknown";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🌦️</div>

          <h1 className="text-2xl font-bold text-green-800">
            Loading Weather...
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait while we fetch the latest weather.
          </p>
        </div>
      </main>
    );
  }

  if (error || !weather) {
    return (
      <main className="min-h-screen bg-green-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>

          <h1 className="text-2xl font-bold text-gray-900">
            Weather Unavailable
          </h1>

          <p className="text-gray-600 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-bold"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const current = weather.current;
  const daily = weather.daily;

  return (
    <main className="min-h-screen bg-green-50 px-5 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="text-green-700 font-semibold mb-6 hover:text-green-900"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-3">
            🌦️
          </div>

          <h1 className="text-3xl font-bold text-green-800">
            Weather
          </h1>

          <p className="text-gray-600 mt-2">
            Current weather information for your farming area.
          </p>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <p className="text-sm text-gray-500">
            Current Conditions
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4">

            <div className="text-7xl">
              🌤️
            </div>

            <div>
              <div className="text-5xl font-bold text-green-800">
                {Math.round(current.temperature_2m)}°C
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-2">
                {getWeatherText(current.weather_code)}
              </h2>

              <p className="text-gray-500 mt-1">
                Feels like{" "}
                {Math.round(current.apparent_temperature)}°C
              </p>
            </div>

          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                💧
              </div>

              <p className="text-sm text-gray-500">
                Humidity
              </p>

              <p className="text-xl font-bold text-green-800">
                {current.relative_humidity_2m}%
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                💨
              </div>

              <p className="text-sm text-gray-500">
                Wind Speed
              </p>

              <p className="text-xl font-bold text-green-800">
                {Math.round(current.wind_speed_10m)} km/h
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <div className="text-3xl mb-2">
                🌧️
              </div>

              <p className="text-sm text-gray-500">
                Rain Probability
              </p>

              <p className="text-xl font-bold text-green-800">
                {daily.precipitation_probability_max[0]}%
              </p>
            </div>

          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-white rounded-3xl shadow-lg p-7 mb-8">

          <h2 className="text-2xl font-bold text-green-800">
            🌱 Farming Advice
          </h2>

          <div className="mt-5 space-y-4">

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                💧 Irrigation
              </h3>

              <p className="text-gray-600 mt-1">
                Check rainfall conditions before irrigation.
                Avoid unnecessary watering when rain is expected.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                🌾 Crop Care
              </h3>

              <p className="text-gray-600 mt-1">
                Monitor temperature, humidity and rainfall
                conditions regularly for better crop management.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-bold text-green-800">
                🌧️ Rain Alert
              </h3>

              <p className="text-gray-600 mt-1">
                Keep an eye on rainfall probability before
                spraying fertilizers or pesticides.
              </p>
            </div>

          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white rounded-3xl shadow-lg p-7">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            7-Day Forecast
          </h2>

          <div className="space-y-3">

            {daily.time.map((date, index) => (

              <div
                key={date}
                className="flex items-center justify-between gap-4 border border-green-100 rounded-2xl p-4"
              >

                <div className="font-semibold text-gray-700">
                  {new Date(date).toLocaleDateString(
                    "en-IN",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    }
                  )}
                </div>

                <div className="text-2xl">
                  🌦️
                </div>

                <div className="text-right">

                  <p className="font-bold text-green-800">
                    {Math.round(daily.temperature_2m_max[index])}° /
                    {" "}
                    {Math.round(daily.temperature_2m_min[index])}°
                  </p>

                  <p className="text-sm text-gray-500">
                    Rain {daily.precipitation_probability_max[index]}%
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </main>
  );
}