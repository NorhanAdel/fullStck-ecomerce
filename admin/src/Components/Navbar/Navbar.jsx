import React from 'react'
import "./Navbar.css"
import logo from "../../Assets/nav-logo.svg"
import navprofile from "../../Assets/nav-profile.svg";

export  const  Navbar = ()=> {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="nav-logo" />
      <img src={navprofile} alt="logo" className="nav-profile" />
    </div>
  );
}
