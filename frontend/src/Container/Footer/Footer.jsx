import React from 'react'
import "./Footer.css"
import IMG from "../../Assets/logo_big.png"
import { footerLink } from '../../constant'
import Instegram from "../../Assets/instagram_icon.png"
import Pinterst from "../../Assets/pintester_icon.png"
import Whatsapp from "../../Assets/whatsapp_icon.png"
export  const Footer = ()=> {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={IMG} alt="Logo" />
        <p>SHOOPER</p>
      </div>
      <ul className="footer-link">
        {footerLink.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
      <div className="socail-icons">
        <div className="social-icons-container">
          <img src={Instegram} />
        </div>
        <div className="social-icons-container">
          <img src={Pinterst} />
        </div>
        <div className="social-icons-container">
          <img src={Whatsapp} />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>CopyRight @ 2024 all right reserved</p>
      </div>
    </div>
  );
}
