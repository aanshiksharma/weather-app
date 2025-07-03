import { useState } from "react";
import "./Footer.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Footer(props) {
  //   props = {
  //     numPages: "No. of Pages",
  //     currPage: "Page Number that is currently open",
  //     lastUpdateTime: "Time when the page was last updated. (in String format)",
  //   };

  const [pageNumber, setPageNumber] = useState(props.currPage);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(".footer .update-status", {
      y: -40,
      opacity: 0,
      duration: 0.6,
    });

    tl.from(".pagenation", {
      opacity: 0,
      duration: 0.6,
    });
  });

  let navIndicators = [];
  for (let i = 0; i < props.numPages; i++) {
    if (i == pageNumber - 1) navIndicators.push(1);
    else navIndicators.push(0);
  }

  const now = new Date();
  let lastUpdateTime = `${
    now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
  }:${now.getMinutes()}`;

  return (
    <footer className="footer">
      <div className="wrapper-main flex">
        <p className="update-status">Last Updated : {lastUpdateTime}</p>
        <div className="pagenation flex">
          <button
            type="button"
            className="btn nav-prev"
            onClick={() => {
              if (pageNumber == 1) setPageNumber(props.numPages);
              else setPageNumber(pageNumber - 1);
            }}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z" />
            </svg>
          </button>
          {navIndicators.map((item, index) => (
            <button
              type="button"
              className={`btn nav-page ${item == 1 ? "current" : ""}`}
              key={index}
              onClick={() => {
                setPageNumber(index + 1);
              }}
            >
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3C0 4.65685 1.34315 6 3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3Z" />
              </svg>
            </button>
          ))}
          <button
            type="button"
            className="btn nav-next"
            onClick={() => {
              if (pageNumber == props.numPages) setPageNumber(1);
              else setPageNumber(pageNumber + 1);
            }}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
