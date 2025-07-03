import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// CSS
import "./Header.css";

function Header(props) {
  const searchField = useRef(null); // to refer to the search input field
  const cityNameRef = useRef(null);
  const hasAnimatedCityName = useRef(false); // to keep track of the cityName's animation

  // States
  const [searchBar, setSearchBar] = useState(false); // to keep track of the searchbar's visibility
  const [cityName, setCityName] = useState(props.cityName);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();

    // Location Pin svg
    tl.from("header .left svg", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "none",
    });

    // Location Name
    tl.from(cityNameRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
    });

    // Add Button and Searchbar on the right
    tl.from(".right", {
      y: -20,
      opacity: 0,
      duration: 0.3,
    });
  }, []);

  // Animation runs only after confirming that the page has mounted and not on the first render.
  // We want to prevent this animation from running on the first render because it is already being run in the timeline earlier.
  // Running it again would break the code and this element might not even appear on the page.
  useGSAP(() => {
    if (hasAnimatedCityName.current) {
      gsap.fromTo(
        cityNameRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 } // delay : 0.5
      );
    } else {
      hasAnimatedCityName.current = true;
    }
  }, [cityName]);
  // JSX
  return (
    <header className="header">
      <div className="wrapper-main flex">
        <div className="left flex">
          <svg
            width="14"
            height="21"
            viewBox="0 0 14 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 20.5C6.76667 20.5 6.56667 20.4333 6.4 20.3C6.23333 20.1667 6.10833 19.9917 6.025 19.775C5.70833 18.8417 5.30833 17.9667 4.825 17.15C4.35833 16.3333 3.7 15.375 2.85 14.275C2 13.175 1.30833 12.125 0.775 11.125C0.258333 10.125 0 8.91667 0 7.5C0 5.55 0.675 3.9 2.025 2.55C3.39167 1.18333 5.05 0.5 7 0.5C8.95 0.5 10.6 1.18333 11.95 2.55C13.3167 3.9 14 5.55 14 7.5C14 9.01667 13.7083 10.2833 13.125 11.3C12.5583 12.3 11.9 13.2917 11.15 14.275C10.25 15.475 9.56667 16.475 9.1 17.275C8.65 18.0583 8.275 18.8917 7.975 19.775C7.89167 20.0083 7.75833 20.1917 7.575 20.325C7.40833 20.4417 7.21667 20.5 7 20.5ZM7 16.925C7.28333 16.3583 7.6 15.8 7.95 15.25C8.31667 14.7 8.85 13.9667 9.55 13.05C10.2667 12.1167 10.85 11.2583 11.3 10.475C11.7667 9.675 12 8.68333 12 7.5C12 6.11667 11.5083 4.94167 10.525 3.975C9.55833 2.99167 8.38333 2.5 7 2.5C5.61667 2.5 4.43333 2.99167 3.45 3.975C2.48333 4.94167 2 6.11667 2 7.5C2 8.68333 2.225 9.675 2.675 10.475C3.14167 11.2583 3.73333 12.1167 4.45 13.05C5.15 13.9667 5.675 14.7 6.025 15.25C6.39167 15.8 6.71667 16.3583 7 16.925ZM7 10C7.7 10 8.29167 9.75833 8.775 9.275C9.25833 8.79167 9.5 8.2 9.5 7.5C9.5 6.8 9.25833 6.20833 8.775 5.725C8.29167 5.24167 7.7 5 7 5C6.3 5 5.70833 5.24167 5.225 5.725C4.74167 6.20833 4.5 6.8 4.5 7.5C4.5 8.2 4.74167 8.79167 5.225 9.275C5.70833 9.75833 6.3 10 7 10Z" />
          </svg>

          <p ref={cityNameRef}>{cityName}</p>
        </div>

        <div className="right flex">
          <form
            className={`${searchBar ? "" : "hidden"} searchBar flex`}
            onSubmit={(event) => {
              if (searchField.current.value.trim() !== "")
                setCityName(searchField.current.value);
              event.preventDefault();
            }}
          >
            <input
              id="cityNameInput"
              type="text"
              placeholder={cityName}
              ref={searchField}
              defaultValue={props.cityName}
            />

            <button type="submit" className="btn">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.6 18.9706L10.3 12.6706C9.8 13.0706 9.225 13.3872 8.575 13.6206C7.925 13.8539 7.23333 13.9706 6.5 13.9706C4.68333 13.9706 3.14583 13.3414 1.8875 12.0831C0.629167 10.8247 0 9.28725 0 7.47058C0 5.65391 0.629167 4.11641 1.8875 2.85808C3.14583 1.59975 4.68333 0.970581 6.5 0.970581C8.31667 0.970581 9.85417 1.59975 11.1125 2.85808C12.3708 4.11641 13 5.65391 13 7.47058C13 8.20391 12.8833 8.89558 12.65 9.54558C12.4167 10.1956 12.1 10.7706 11.7 11.2706L18 17.5706L16.6 18.9706ZM6.5 11.9706C7.75 11.9706 8.8125 11.5331 9.6875 10.6581C10.5625 9.78308 11 8.72058 11 7.47058C11 6.22058 10.5625 5.15808 9.6875 4.28308C8.8125 3.40808 7.75 2.97058 6.5 2.97058C5.25 2.97058 4.1875 3.40808 3.3125 4.28308C2.4375 5.15808 2 6.22058 2 7.47058C2 8.72058 2.4375 9.78308 3.3125 10.6581C4.1875 11.5331 5.25 11.9706 6.5 11.9706Z" />
              </svg>
            </button>
          </form>

          <button
            type="button"
            className={`${searchBar ? "rotate" : " "} btn`}
            onClick={() => {
              setSearchBar(!searchBar);
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.94141 8.97058H0.941406L0.941406 6.97058H6.94141V0.970581L8.94141 0.970581V6.97058L14.9414 6.97058V8.97058H8.94141V14.9706H6.94141L6.94141 8.97058Z" />
            </svg>
          </button>
        </div>
      </div>{" "}
    </header>
  );
}

export default Header;
