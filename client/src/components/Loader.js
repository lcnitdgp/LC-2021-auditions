import React from "react";
import PropTypes from "prop-types";
import "./Loader.css";
import officePreLoad from "../images/office_preload.png";
function Loader(props) {
  return (
    <div class="Loader">
      <img class="image_loader" src={officePreLoad} />
    </div>
  );
}

export default Loader;
