import React from 'react'
import "./NewLetter.css"
export  const  NewLetter = ()=> {
  return (
    <div className="newLetter">
      <h1>Get Exclusive Offer For Your Email</h1>
      <p>Subscribe To Our New Letter And Update</p>
      <div>
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
