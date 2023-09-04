import React from "react";
import "./Spinner.css"; // Import the CSS file

function Spinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
