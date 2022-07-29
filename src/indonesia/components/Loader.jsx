import React from "react";

function Loader() {
  return (
    <div style={{ position: "relative", display: "block" }}>
      <div
        className="spinner-border"
        style={{
          width: "1.5rem",
          height: "1.5rem",
          position: "absolute",
          top: "-40px",
          color: "white",
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
export default Loader;
