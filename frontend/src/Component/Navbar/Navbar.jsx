import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import logo from "../../Assets/logo.png"
import cartIcon from "../../Assets/cart_icon.png"
import { navbar } from '../../constant'
import { Link } from "react-router-dom"
import nav_drop from "../../Assets/dropdown_icon.png"
import { ShopContainer } from '../../context/ShopContext'
export  const Navbar = ()=> {
  const [nav, setNav] = useState("shop")
  const { getTotalItem } = useContext(ShopContainer);
  const menueRef = useRef();
  const dropDownToggle = (e) => {
    menueRef.current.classList.toggle('nav-menue-visible');
    e.target.classList.toggle("open")
  } 
  return (
    <div className="navbar">
      <div className="navLogo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <img
        src={nav_drop}
        alt="menue"
        onClick={dropDownToggle}
        className="drop-down"
      />
      <ul className="navMenu" ref={menueRef}>
        {navbar.map((item, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setNav(item);
              }}
            >
              <Link to={item}>
                {" "}
                '{item} {nav == item ? <hr /> : <></>}
              </Link>{" "}
            </li>
          );
        })}
      </ul>
      <div className="login">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            LogOut
          </button>
        ) : (
          <Link to="/login">
            {" "}
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          {" "}
          <img src={cartIcon} alt="cart" />
        </Link>
        <div className="count">{getTotalItem()}</div>
      </div>
    </div>
  );
}
