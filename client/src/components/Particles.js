import React from "react";
import "./Particles.css";

function Particles(props) {
  const numberOfParticles = 50;
  return (
    <>
      {[...Array(numberOfParticles)].map((_, i) => (
        <div className="firefly" />
      ))}
    </>
  );
}
export default Particles;
