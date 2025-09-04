import React from "react";
import "./Breakdum.css";
import arrow_icon from "../../Assets/breadcrum_arrow.png";

export const Breakdum = (props) => {
  const { product } = props;

  return (
    <div className="breakdum">
      HOME <img src={arrow_icon} alt="arrow" /> SHOP{" "}
      <img src={arrow_icon} alt="arrow" />
      {product.category} <img src={arrow_icon} alt="arrow" /> {product.name}
    </div>
  );
};
