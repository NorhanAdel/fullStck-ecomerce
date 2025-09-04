import React from "react";
import "./Hero.css";
import hand from "../../Assets/hand_icon.png";
import iconArow from "../../Assets/arrow.png";
import hero_image from "../../Assets/hero_image.png";
export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1>NEW ARIVALS ONLY</h1>
        <div>
          <div className="handIcons">
            <p>New</p>
            <img src={hand} />
          </div>
          <p>Collection</p>
          <p>For Everyone</p>
          <div className="hero-btn">
            <div>Latst Collection</div>
            <img src={iconArow} />
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} />
      </div>
    </div>
  );
};
