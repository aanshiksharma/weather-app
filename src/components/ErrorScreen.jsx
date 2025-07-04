import React from "react";
import "./ErrorScreen.css";

function ErrorScreen({ errorMessage }) {
  return (
    <div className="error-screen">
      <h1>Error!</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorScreen;
