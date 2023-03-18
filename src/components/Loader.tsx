import React from "react";

function Loader() {
  return (
    <div className="radial-progress  animate-spin" style={{ "--value": 80 }} />
  );
}

export default Loader;
