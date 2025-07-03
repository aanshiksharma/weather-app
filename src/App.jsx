import { useRef, useEffect, useState } from "react";

// CSS
import "./App.css";
import "./utils.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

// mock weather data
import mockWeather from "./mockData.json";

let numPages = 3;
function App() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const cityInput = useRef(null);
  const inputForm = useRef(null);

  // const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;

  //         // API integration occurs here and we put the coordinates into the API to get the weather forecast for the user's current location.
  //       },
  //       (err) => {
  //         setError("Failed to load weather");
  //         setLoading(true);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation was not supported by your browser.");
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <>
      <Header cityName={mockWeather.cityName} />
      <Hero
        cityName={mockWeather.cityName}
        main={mockWeather.main}
        weather={mockWeather.weather[0]}
        wind={mockWeather.wind}
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
