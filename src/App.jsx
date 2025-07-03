import { useRef, useEffect, useState } from "react";
import "./App.css";
import "./css/utils.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

let numPages = 3;
function App() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const cityInput = useRef(null);
  const inputForm = useRef(null);

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

  let city = {
    name: "Vice City",
  };

  return (
    <>
      <Header cityName="Noida" />
      <Footer lastUpdateTime="5:43 AM" numPages={numPages} currPage={1} />
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
