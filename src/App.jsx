import { useRef, useEffect, useState } from "react";

// CSS
import "./App.css";
import "./utils.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

let numPages = 3;
function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  // Do not forget to add the .env file to the root directory
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            const data = await res.json();

            if (res.ok) {
              setWeatherData(data);
              console.log(res);
              console.log(data);
            } else setError(data.message || "Something went wrong.");
          } catch (err) {
            setError("Failed to fetch weather data.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("Failed to get location.");
          setLoading(false);
        }
      );
    } else {
      setError("Location was not supported by your browser / device.");
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen errorMessage={error} />;

  // Destructure for easy use
  const {
    name,
    main: { temp, feels_like, pressure, humidity },
    weather,
    wind: { speed },
  } = weatherData;
  const weatherDesc = weather[0].description;
  const icon = weather[0].icon;

  return (
    <>
      <Header cityName={weatherData.name} />
      <Hero
        cityName={weatherData.name}
        main={weatherData.main}
        weather={weatherData.weather[0]}
        wind={weatherData.wind}
      />
      <Footer numPages={numPages} currPage={1} />
      {/*       
        props = {
          numPages: "No. of Pages",
          currPage: "Page Number that is currently open",
          lastUpdateTime: "Time when the page was last updated. (in String format)",
        };
      */}
    </>
  );
}

export default App;
